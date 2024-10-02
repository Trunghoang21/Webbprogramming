export default function Toast({orderConfirmation, showToast, setShowToast}) {
    const closeToast = () =>{
        setShowToast(false)
    };
    if (showToast == false){
        return null;
    }
    return (
        <div className={`toast ${showToast ? 'show' : 'hide'}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header container">
                <button type="button" className="btn-close text-right" data-bs-dismiss="toast" aria-label="Close" onClick={closeToast}></button>
            </div>
            <div className="toast-body">
                <h5>Order Confirmation</h5>
                <p>{`Status: ${orderConfirmation.status}`}</p>
                <p>{`Order number: ${orderConfirmation.uuid}`}</p>
                <p>{`Time: ${orderConfirmation.timestamp}`}</p>
                <p>{`Number of salads: ${orderConfirmation.order.length}`}</p>
                <p>{`Price: ${orderConfirmation.price}`}</p>
            </div>
        </div>
    )
}