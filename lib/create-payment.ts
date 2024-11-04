import { randomUUID } from "crypto";

interface Props {
  description: string;
  amount: number;
  orderId: number;
}

export async function createPayment(details: any) {
  console.log(details);
  const id = randomUUID();

  return { id, ...details };
}