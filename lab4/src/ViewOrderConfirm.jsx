import { useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ViewOrderConfirm() {
    const { orderId } = useParams();
    const saladList = useOutletContext();
    const newSalad = saladList.find(salad => salad.uuid === orderId);
    if (!newSalad) {
        return (
            <div>
                <p>Order with id {orderId} not found</p>
            </div>
        );
    }
    return (
        <div className="alert alert-info">
            <p>Order confirm:</p>
            <p>Salad with id {newSalad.uuid} has been added</p>
        </div>
    );
}