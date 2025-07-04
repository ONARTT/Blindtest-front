
export interface IScores {
    score: number
}
const Scores = (props: IScores) => {

    return (
        <div>
            <p>Score : {props.score}</p>
        </div>
    )
}

export default Scores