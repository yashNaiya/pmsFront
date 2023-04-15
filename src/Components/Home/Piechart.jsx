import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";




export const options = {
    title: "Tasks",
    pieHole: 0.4,
    is3D: false,
    colors: ['#B6E2A1', '#FEBE8C', '#D9D9D9', '#FD8A8A'],

};

export function Piechart(props) {
    const [completed, setcompleted] = useState(0)
    const [error, seterror] = useState(0)
    const [onHold, setonHold] = useState(0)
    const [working, setworking] = useState(0)
    useEffect(() => {
        let tasksTemp = 0
        let completedArray = 0
        let errorArray = 0
        let workingArray = 0
        let onHoldArray = 0
        if (props.project.groups) {
            console.log(props.project.groups)
            props.project.groups.forEach(group => {
                if (group.tasks.length !== 0) {
                    group.tasks.forEach(task => {
                        if (task.status === 'complete') {
                            // setcompleted(completed + 1)
                            completedArray = completedArray + 1
                        } else if (task.status === 'on hold') {
                            // setonHold(onHold + 1)
                            onHoldArray = onHoldArray + 1
                        } else if (task.status === 'working') {
                            // setworking(working + 1)
                            workingArray = workingArray + 1
                        } else if (task.status === 'error') {
                            // seterror(error + 1)
                            errorArray = errorArray + 1
                        }
                    });

                }
            });
            // console.log(completedArray)
            // console.log(errorArray)
            // console.log(onHoldArray)
            // console.log(workingArray)
            setcompleted(completedArray)
            seterror(errorArray)
            setworking(workingArray)
            setonHold(onHoldArray)
        }
    }, [props])

    const data = [
        ["Task", "Hours per Day"],
        ["Completed", completed],
        ["Working", working],
        ["On Hold", onHold],
        ["Error", error],
        // CSS-style declaration
    ];
    return (
        <Chart
            chartType="PieChart"
            width="500px"
            height="300px"
            data={data}
            options={options}
        />
    );
}
