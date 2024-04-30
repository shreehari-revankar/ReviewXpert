import { UilClipboardAlt } from "@iconscout/react-unicons";
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import userEvent from "@testing-library/user-event";
const { keyboard } = userEvent;

// Analytics Cards Data
export const salesCardsData = [
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
    },
    {
        title: "Last Week",
        color: {
            backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
        },
        barValue: 80,
        value: "14,270",
        png: UilMoneyWithdrawal,
        series: [
            {
                name: "Weekly",
                data: [10, 100, 50, 70, 80, 30, 40],
            },
        ],
        xaxis: {
            categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            title: 'Week Days'
        },
        yaxis: {
            title: 'Frequency by Week'
        }
    },
    {
        title: "Today",
        color: {
            backGround:
                "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
        },
        barValue: 60,
        value: "4,270",
        png: UilClipboardAlt,
        series: [
            {
                name: "Daily",
                data: [10, 25, 15, 30, 12, 15],
            },
        ],
        xaxis: {
            categories: ["7AM-9AM", "9AM-1PM", "1PM-5PM", "5PM-10PM", "10PM-12AM", "12AM-7AM"],
            title: 'Intervals'
        },
        yaxis: {
            title: 'Frequency by Interval'
        }
    },

];
