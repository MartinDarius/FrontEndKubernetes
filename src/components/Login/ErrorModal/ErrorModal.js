import './ErrorModal.css';

const ErrorModal = (props) => {

    function onOkHandler(){
        props.onConfirm();
    }

    return(
        <div className="modal">
            <h2>{props.message}</h2>
            <button className='button' onClick={onOkHandler}>OK</button> 
        </div>
    )
}

export default ErrorModal;