export const API_ROUTE = {
  auth: {
    login: `${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`,
  },
  customers: {
    getAll: `${process.env.NEXT_PUBLIC_BASE_URL}/customers`,
    getOne: `${process.env.NEXT_PUBLIC_BASE_URL}/customers/{customerId}`,
  },
};
