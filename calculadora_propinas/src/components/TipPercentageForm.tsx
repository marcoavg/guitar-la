
const tipOptions = [
  {
    id: 'tip-10',
    value: .10,
    label: '10%'
  },
  {
    id: 'tip-20',
    value: .20,
    label: '20%'
  },
  {
    id: 'tip-50',
    value: .50,
    label: '50%'
  },
]

type TipPercentageFormProps = {
  setTip: React.Dispatch<React.SetStateAction<number>>;
}

export default function TipPercentageForm({ setTip }: TipPercentageFormProps) {
  return (
    <div>
        <h3 className="font-black text-2xl">Propina :</h3>
        <form>
            {tipOptions.map(option => (
                <div className="flex gap-2 items-center space-x-2" key={option.id}>
                    <label htmlFor={option.id}> {option.label} </label>
                    <input 
                        type="radio"
                        id={option.id}
                        name="tip"
                        value={option.value}
                        onChange={() => setTip(option.value)}
                    />
                    
                </div>
            ))}
        </form>
    </div>
  )
}
