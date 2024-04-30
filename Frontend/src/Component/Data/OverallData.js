import { UilClipboardAlt } from "@iconscout/react-unicons";
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import userEvent from "@testing-library/user-event";
const { keyboard } = userEvent;

// Analytics Cards Data
export const overResult = [
    {
        title: "Last Month",
        color: {
            backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        },
        barValue: 70,
        value: "25,970",
        png: UilUsdSquare,
        series: [
            {
                name: "Monthly",
                data: [31, 40, 28, 51, 42, 109, 100, 120, 80, 100, 100, 100],
            },
        ],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            title: 'Months'
        },

        yaxis: {
            title: 'Frequency by Month'
        }
    }

];
