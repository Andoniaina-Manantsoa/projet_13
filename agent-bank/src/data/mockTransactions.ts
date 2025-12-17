export type Transaction = {
    id: string;
    date: string;
    description: string;
    amount: number;
    balance: number;
    type: string;
    category: string;
    notes: string;
};

export type AccountInfo = {
    id: string;
    title: string;
    amount: string;
    description: string;
    transactions: Transaction[];
};

// Données des comptes avec leurs transactions
export const accountsData: Record<string, AccountInfo> = {
    "8349": {
        id: "8349",
        title: "Argent Bank Checking (x8349)",
        amount: "$2,082.79",
        description: "Available Balance",
        transactions: [
            {
                id: "1",
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
                date: "June 20th, 2020",
                description: "Golden Sun Bakery",
                amount: 50.00,
                balance: 2187.79,
                type: "Electronic",
                category: "Food",
                notes: ""
            }
        ]
    },
    "6712": {
        id: "6712",
        title: "Argent Bank Savings (x6712)",
        amount: "$10,928.42",
        description: "Available Balance",
        transactions: [
            {
                id: "1",
                date: "June 19th, 2020",
                description: "Salary Deposit",
                amount: 2000.00,
                balance: 10928.42,
                type: "Electronic",
                category: "Income",
                notes: "Monthly salary"
            },
            {
                id: "2",
                date: "June 15th, 2020",
                description: "Transfer to Checking",
                amount: 500.00,
                balance: 8928.42,
                type: "Transfer",
                category: "Transfer",
                notes: ""
            },
            {
                id: "3",
                date: "June 10th, 2020",
                description: "Interest Payment",
                amount: 25.50,
                balance: 9428.42,
                type: "Electronic",
                category: "Income",
                notes: "Monthly interest"
            }
        ]
    },
    "5201": {
        id: "5201",
        title: "Argent Bank Credit Card (x5201)",
        amount: "$184.30",
        description: "Current Balance",
        transactions: [
            {
                id: "1",
                date: "June 18th, 2020",
                description: "Amazon Purchase",
                amount: 52.30,
                balance: 184.30,
                type: "Electronic",
                category: "Shopping",
                notes: ""
            },
            {
                id: "2",
                date: "June 16th, 2020",
                description: "Netflix Subscription",
                amount: 15.99,
                balance: 132.00,
                type: "Electronic",
                category: "Entertainment",
                notes: "Monthly subscription"
            },
            {
                id: "3",
                date: "June 14th, 2020",
                description: "Gas Station",
                amount: 45.00,
                balance: 116.01,
                type: "Electronic",
                category: "Transport",
                notes: ""
            },
            {
                id: "4",
                date: "June 12th, 2020",
                description: "Restaurant",
                amount: 71.01,
                balance: 71.01,
                type: "Electronic",
                category: "Food",
                notes: "Dinner with friends"
            }
        ]
    }
};