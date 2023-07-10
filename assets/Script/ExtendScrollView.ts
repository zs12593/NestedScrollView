
export default class ExtendScrollView {

    static extend(sv: cc.ScrollView) {
        if (sv == null) return;

        let subViewMove = false;
        sv.node.on(cc.Node.EventType.TOUCH_MOVE, function (e: cc.Event.EventTouch) {
            if (e.target != sv.node) {
                if (subViewMove) return;
                e.stopPropagation();

                // if (sv["_touchMoved"]) return;
                let deltaMove = e.getLocation().sub(e.getStartLocation());
                let isMoveX = Math.abs(deltaMove.x) > 7;
                let isMoveY = Math.abs(deltaMove.y) > 7;
                cc.log(deltaMove.x, isMoveX, isMoveY)
                if (sv.horizontal && !isMoveX && isMoveY) {
                    subViewMove = true;
                } else if (sv.vertical && !isMoveY && isMoveX) {
                    subViewMove = true;
                }
            }
        }, sv.node, true);

        sv.node.on(cc.Node.EventType.TOUCH_END, function () { subViewMove = false }, sv.node, true);
        sv.node.on(cc.Node.EventType.TOUCH_CANCEL, function () { subViewMove = false }, sv.node, true);

        let old = sv["hasNestedViewGroup"];
        sv["hasNestedViewGroup"] = function (event, captureListeners) {
            if (event.eventPhase !== cc.Event.CAPTURING_PHASE) return;
            if (!subViewMove) return false;
            return old.call(this, event, captureListeners);
            // return false; // surprise
        }.bind(sv);
    }

}
