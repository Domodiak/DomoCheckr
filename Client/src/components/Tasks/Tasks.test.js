import { render, screen, fireEvent } from '@testing-library/react'
import { Task } from './Task'
import userEvent from '@testing-library/user-event'
import { MapTasks } from './MapTasks'

describe("Tasks", () => {

    describe("Task component", () => {
        
        test("Renders content correctly", () => {
            render(
                <Task title="Test task" description="my test task description" />
            )

            var title = screen.getByText("Test task")
            var description = screen.getByText("my test task description")
            
            expect(title).toBeInTheDocument()
            expect(description).toBeInTheDocument()

        })

        test("Renders icons", () => {
            render(
                <Task title="Test task" description="my test task description" />
            )

            var icon = screen.getByText("more_vert")
            
            expect(icon).toBeInTheDocument()

        })

        test("Renders dropdown", () => {
            const { getByTestId } = render(
                <Task title="Test task" description="my test task description" />
            )

            var icon = getByTestId("dropdownopenbutton")
            
            fireEvent.click(icon)
            
            var dropdown = getByTestId("dropdown")

            expect(dropdown).toBeInTheDocument()
        })

    })

    describe("MapTasks component", () => {

        test("render correct number of items", () => {

            var exampleTasks = [
                { title: "task 1", description: "task 1" },
                { title: "task 2", description: "task 2" },
                { title: "task 3", description: "task 3" },
                { title: "task 4", description: "task 4" },
            ]

            const { getByTestId } = render(
                <MapTasks tasks={exampleTasks} />
            )

            const list = getByTestId("task-list")

            expect(list).toBeInTheDocument()

            expect(list.childElementCount).toBe(4)

        })

        test("render items in reversed order", () => {

            var exampleTasks = [
                { title: "task 1", description: "task 1" },
                { title: "task 2", description: "task 2" },
                { title: "task 3", description: "task 3" },
                { title: "task 4", description: "task 4" },
            ]

            const { getByTestId } = render(
                <MapTasks tasks={exampleTasks} />
            )

            const list = getByTestId("task-list")

            expect(list).toBeInTheDocument()

            const renderedTasks = Array.from(list.children).map((el) => ({
                title: el.querySelector(".taskTitle").textContent,
                description: el.querySelector(".taskDescription").textContent,
            }));

            expect(renderedTasks).toStrictEqual([...exampleTasks].reverse())
        })

    })

})