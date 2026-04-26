import { Spinner } from "@/components/ui/spinner"

const Loading = ({divStyle, spinerStyle}: {divStyle: string, spinerStyle: string}) => {
  return (
    <div className={divStyle}>
      <Spinner className={spinerStyle} />
    </div>
  )
}

export default Loading;
