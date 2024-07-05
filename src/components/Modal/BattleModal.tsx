import { ModalProps, Modal } from "antd";
import "./battle.less";

interface BattleModalProps extends ModalProps {}
export default function BattleModal(props: BattleModalProps) {
  return (
    <Modal className={"battle-modal"} {...props}>
      {props.children}
    </Modal>
  );
}
