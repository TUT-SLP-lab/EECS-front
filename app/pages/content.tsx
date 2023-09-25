import Table from "@/components/table";

export default function Content() {
    return (
        <>
        <>机を配置する</>
        <svg height={1000} width={1000}>
            <rect x={1} y={1} height={999} width={999} fill="white" stroke="black" strokeWidth={1}></rect>
            <Table x={10} y={5} height={200} width={100} name={"てすと"} />
        </svg>
        </>
      
    )
  }
  