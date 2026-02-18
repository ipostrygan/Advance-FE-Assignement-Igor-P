import { ReactNode } from "react"

interface KeyValueProps {
  label: string
  value: string | ReactNode
}

const KeyValue = ({ label, value }: KeyValueProps) => {
  return (
    <div className="flex flex-col justify-between">
      <dd className="text-base">{value}</dd>
      <dt className="text-semibold text-gray-600 text-xs">{label}</dt>
    </div>
  )
}

export default KeyValue
