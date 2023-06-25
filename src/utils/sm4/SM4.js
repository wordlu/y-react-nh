//smutils.js
import {
  sm4_crypt_ecb,
  sm4_setkey_dec,
  sm4_setkey_enc,
  padding,
  sm4_rounds,
  sm4_setkey,
  sm4CalciRK,
  sm4F,
  sm4Lt,
  sm4Sbox,
  SWAP,
  ROTL,
  SHL,
  PUT_ULONG_BE,
  GET_ULONG_BE,
  context
} from './SM40';

import {
  byteToString,
  stringToByte,
  isNull
} from './byte&string';

/**
 * base64js
 */
/**
 * base64js
 * base64js.toByteArray(d.input)
 * base64js.fromByteArray(c);
 * @author c.z.s
 * @email 1048829253@qq.com
 * @company
 * @date 2018-07
 *
 */
(function (r) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = r()
    } else {
        if (typeof define ===
            "function" && define.amd) {
            define([], r)
        } else {
            let e;
            if (typeof window !== "undefined") {
                e = window
            } else {
                if (typeof global
                    !== "undefined") {
                    e = global
                } else {
                    if (typeof self !== "undefined") {
                        e = self
                    } else {
                        e = this
                    }
                }
            }
            e.base64js = r()
        }
    }
})(function () {
    let r, e, t;
    return function r(e, t, n) {
        function o(i, a) {
            if (!t[i]) {
                if (!e[i]) {
                    let u = typeof require == "function" && require;
                    if (!a && u) {
                        return u(i, !0)
                    }
                    if (f) {
                        return f(i, !0)
                    }
                    let d = new Error("Cannot find module '" + i + "'");
                    throw d.code = "MODULE_NOT_FOUND", d
                }
                let c = t[i] = {exports: {}};
                e[i][0].call(c.exports, function (r) {
                    let t = e[i][1][r];
                    return o(t ? t : r)
                }, c, c.exports, r, e, t, n)
            }
            return t[i].exports
        }

        let f = typeof require == "function" && require;
        for (let i = 0; i < n.length; i++) {
            o(n[i])
        }
        return o
    }({
        "/": [function (r, e, t) {
            t.byteLength = c;
            t.toByteArray = v;
            t.fromByteArray = s;
            let n = [];
            let o = [];
            let f = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
            let i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            for (let a = 0, u = i.length; a < u; ++a) {
                n[a] = i[a];
                o[i.charCodeAt(a)] = a
            }
            o["-".charCodeAt(0)] = 62;
            o["_".charCodeAt(0)] = 63;

            function d(r) {
                let e = r.length;
                if (e % 4 > 0) {
                    throw new Error("Invalid string. Length must be a multiple of 4")
                }
                return r[e - 2] === "=" ? 2 : r[e - 1] === "=" ? 1 : 0
            }

            function c(r) {
                return r.length * 3 / 4 - d(r)
            }

            function v(r) {
                let e, t, n, i, a;
                let u = r.length;
                i = d(r);
                a = new f(u * 3 / 4 - i);
                t = i > 0 ? u - 4 : u;
                let c = 0;
                for (e = 0; e < t; e += 4) {
                    n = o[r.charCodeAt(e)] << 18 | o[r.charCodeAt(e + 1)] << 12 | o[r.charCodeAt(e + 2)] << 6 | o[r.charCodeAt(e + 3)];
                    a[c++] = n >> 16 & 255;
                    a[c++] = n >> 8 & 255;
                    a[c++] = n & 255
                }
                if (i === 2) {
                    n = o[r.charCodeAt(e)] << 2 | o[r.charCodeAt(e + 1)] >> 4;
                    a[c++] = n & 255
                } else {
                    if (i === 1) {
                        n = o[r.charCodeAt(e)] << 10 | o[r.charCodeAt(e + 1)] << 4 | o[r.charCodeAt(e + 2)] >> 2;
                        a[c++] = n >> 8 & 255;
                        a[c++] = n & 255
                    }
                }
                return a
            }

            function l(r) {
                return n[r >> 18 & 63] + n[r >> 12 & 63] + n[r >> 6 & 63] + n[r & 63]
            }

            function h(r, e, t) {
                let n;
                let o = [];
                for (let f = e; f < t; f += 3) {
                    n = (r[f] << 16) + (r[f + 1] << 8) + r[f + 2];
                    o.push(l(n))
                }
                return o.join("")
            }

            function s(r) {
                let e;
                let t = r.length;
                let o = t % 3;
                let f = "";
                let i = [];
                let a = 16383;
                for (let u = 0, d = t - o; u < d; u += a) {
                    i.push(h(r, u, u + a > d ? d : u + a))
                }
                if (o === 1) {
                    e = r[t - 1];
                    f += n[e >> 2];
                    f += n[e << 4 & 63];
                    f += "=="
                } else {
                    if (o === 2) {
                        e = (r[t - 2] << 8) + r[t - 1];
                        f += n[e >> 10];
                        f += n[e >> 4 & 63];
                        f += n[e << 2 & 63];
                        f += "="
                    }
                }
                i.push(f);
                return i.join("")
            }
        }, {}]
    }, {}, [])("/")
});
//封装sm4.js，实现ECB工作模式

function sm4utils(key) {
    this.seckey = key;
    this.encryptData_ECB = encryptData_ECB;
    this.decryptData_ECB = decryptData_ECB;

    // this.hexString = false;
    function encryptData_ECB(plainText) {
        let ctx = new context();

        ctx.isPadding = true;
        ctx.mode = 1;
        let keyBytes;
        try {
            if (this.seckey == null) {
                throw "key 不规范"
            }
            keyBytes = stringToByte(this.seckey);

        } catch (e) {
            Error(e.message);
        }
        // alert("key"+keyBytes.length)
       // alert("key: "+keyBytes);
        sm4_setkey_enc(ctx, keyBytes);
        let encrypted = sm4_crypt_ecb(ctx, stringToByte(plainText));
        let cipherText = base64js.fromByteArray(encrypted);
        if (cipherText != null && cipherText.trim().length > 0) {
            cipherText.replace(/(\s*|\t|\r|\n)/g, "");
        }
        // alert(cipherText);
        return cipherText;
    }

    function decryptData_ECB(cipherText) {
        try {
            let ctx = new context();
            ctx.isPadding = true;
            ctx.mode = 0;

            let keyBytes = stringToByte(this.seckey);
            sm4_setkey_dec(ctx, keyBytes);
            let decrypted = sm4_crypt_ecb(ctx, base64js.toByteArray(cipherText));
            return byteToString(decrypted);
        } catch (e) {
            Error(e.message);
            return null;
        }
    }
}

export {
  sm4utils
}
