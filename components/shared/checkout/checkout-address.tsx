import { FormTextarea, FormInput, WhiteBlock } from "../";
interface Props {
  className?: string;
}

export const CheckoutAddress: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Delivery Address" className={className}>
      <div className="flex flex-col gap-5">
        <FormInput name="address" className="text-base" placeholder="Address"/>
        <FormTextarea name='comment' className="text-base" rows={5} placeholder="Order notes"/>
      </div>
    </WhiteBlock>
  )
}