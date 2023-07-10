import ExtendScrollView from "./ExtendScrollView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;


    start() {
        ExtendScrollView.extend(this.scrollView);
    }
}
