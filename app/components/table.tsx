
interface Props{
    x:number;
    y:number;
    height:number;
    width:number;
    name:string;
}

export default function Table({x,y,height,width,name}:Props) {
    return(
        <>
        <rect x={x} y={y} height={height} width={width} fill="yellow"></rect>
        <text x={x+width/2} y={y+height/3} writingMode="tb">{name}</text>
        </>
    )
}