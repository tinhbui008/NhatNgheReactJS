import { useSelector, useDispatch } from "react-redux";

export const CounterComponent = () => {
    const dispatch = useDispatch()
    const count = useSelector(state => state);
    return (
        <div>
            <div>Click {count} lan</div>
            <div>
                <button onClick={() => {
                    dispatch({type:'INCREMENT'})
                }}>+</button>
                <button onClick={() => {
                    dispatch({ type: 'DECREMENT' })
                }}>-</button>
            </div>
        </div>
    );
}