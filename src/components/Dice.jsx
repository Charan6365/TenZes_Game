export default function Dice(props){
    const held=props.held;
    return (
        <div className={(held)? "dice-frame green":"dice-frame"} onClick={()=> props.hold(props.id)}>
            <h2>{props.value}</h2>
        </div>
    )
}  