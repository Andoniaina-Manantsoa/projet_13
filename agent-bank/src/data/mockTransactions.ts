export type Transaction = {
    id: string;
    accountId: string;
    date: string;
    description: string;
    amount: number;
    balance: number;
    type: string;
    category: string;
    notes: string;
};

export const mockTransactions: Transaction[] = [
    {
        id: "1",
        accountId: "8349",
        date: "June 20th, 2020",
        description: "Golden Sun Bakery",
        amount: 5.00,
        balance: 2082.79,
        type: "Electronic",
        category: "Food",
        notes: ""
    },
    {
        id: "2",
        accountId: "8349",
        date: "June 20th, 2020",
        description: "Golden Sun Bakery",
        amount: 10.00,
        balance: 2087.79,
        type: "Electronic",
        category: "Food",
        notes: ""
    },
    {
        id: "3",
        accountId: "6712",
        date: "June 20th, 2020",
        description: "Golden Sun Bakery",
        amount: 20.00,
        balance: 2097.79,
        type: "Electronic",
        category: "Food",
        notes: ""
    },
    {
        id: "4",
        accountId: "6712",
        date: "June 20th, 2020",
        description: "Golden Sun Bakery",
        amount: 30.00,
        balance: 2117.79,
        type: "Electronic",
        category: "Food",
        notes: ""
    },
    {
        id: "5",
        accountId: "5201",
        date: "June 20th, 2020",
        description: "Golden Sun Bakery",
        amount: 40.00,
        balance: 2147.79,
        type: "Electronic",
        category: "Food",
        notes: ""
    },
    {
        id: "6",
        accountId: "5201",
        date: "June 20th, 2020",
        description: "Golden Sun Bakery",
        amount: 50.00,
        balance: 2187.79,
        type: "Electronic",
        category: "Food",
        notes: ""
    }
];