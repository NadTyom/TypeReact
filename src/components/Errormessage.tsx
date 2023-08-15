
interface ErrorMessageProps{
    error:string
}

export default function Errormessage({error} :ErrorMessageProps) {
  return (
    <div><p className="text-center text-red-600">{error}</p></div>
  )
}
