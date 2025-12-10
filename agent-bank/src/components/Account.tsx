interface AccountProps {
    title: string;
    amount: string;
    description: string;
}

export default function Account({ title, amount, description }: AccountProps) {
    return (
        <section className="flex flex-col lg:flex-row justify-between items-center border border-black bg-white w-4/5 mx-auto p-6 box-border text-left mb-8">
            <div className="w-full flex-1">
                <h3 className="m-0 p-0 text-base font-normal">{title}</h3>
                <p className="m-0 text-[2.5rem] font-bold">{amount}</p>
                <p className="m-0">{description}</p>
            </div>
            <div className="w-full lg:w-auto lg:flex-none">
                <button className="block w-full lg:w-[200px] px-2 py-2 text-lg font-bold mt-4 border border-primary bg-primary text-white">
                    View transactions
                </button>
            </div>
        </section>
    );
}