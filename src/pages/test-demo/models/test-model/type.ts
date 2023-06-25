export interface TestDemoModelState {
  counter: number;
  text: TestDemoModelTextState;
}
export interface TestDemoModelTextState {
  name: string;
}
export interface TestDemoModelMutations {
  increment: Function;
  asyncTestIncrement: Function;
}
export interface TestDemoModelProps extends TestDemoModelState, TestDemoModelMutations {}
