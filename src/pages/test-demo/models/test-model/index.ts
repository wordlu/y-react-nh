import lugiax from '@lugia/lugiax';
import { getService } from '@/config/di.config';
import Bean from '@/config/bean';
import { TestService } from '@/service/interface/service/TestService';
// console.log(Bean);
// import { commonService } from '@ysstech-data/pilot-compartment-model-modeling/lib/config/bean';
// import { thirdScreenService } from '@ysstech-data/pilot-compartment-model-modeling/lib/config/ThirdScreenBean';
const service: TestService = getService(Bean.testService);

//唯一值！
const __LUGIAX_MODEL_DEFINE__ = 'test';
const state = {
  counter: 0,
  text: { name: 'this is test-demo' },
};

export default lugiax.register({
  model: __LUGIAX_MODEL_DEFINE__,
  state,

  mutations: {
    sync: {
      increment(state) {
        // service.test('test');

        const counter = state.get('counter') + 1;
        return state.set('counter', counter);
      },
    },
    async: {
      async testIncrement(state, param) {
        const res = await service.queryTestData();
        // console.log(res);
        return state;
      },
    },
  },
});
