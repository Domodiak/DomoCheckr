import { render, screen } from '@testing-library/react';
import { DropdownMenu } from './Dropdown';

test('renders options correctly', () => {
    render(<DropdownMenu options={[{label: "A", value: "a"},
        {label: "B", value: "b"}
    ]} dropdownClass="TestDropdown" visible />);
    var optionA = screen.getByText("A")
    var optionB = screen.getByText("B")
    expect(optionA).toBeInTheDocument();
    expect(optionB).toBeInTheDocument();
});

test('handles clicks correctly', () => {
    var options = [
        {label: "A", value: "a"},
        {label: "B", value: "b"}
    ]
    var clicks = {}
    const handleSelect = (option) => {
        if(!clicks[option]) {
            clicks[option] = 0
        }
        clicks[option]++
    }

    render(<DropdownMenu options={options} dropdownClass="TestDropdown" visible select={handleSelect} />);
    var optionA = screen.getByText("A")
    var optionB = screen.getByText("B")
    
    optionA.click()
    expect(clicks).toStrictEqual({a: 1})

    optionB.click()
    expect(clicks).toStrictEqual({a: 1, b: 1})

    optionB.click()
    expect(clicks).toStrictEqual({a: 1, b: 2})
});

test("hides when something was chosen", () => {
    var clicks = {}
    var visible = true
    var setVisible = (v) => {
        visible = v
    }
    const handleSelect = (option) => {
        if(!clicks[option]) {
            clicks[option] = 0
        }
        clicks[option]++
    }

    render(
        <DropdownMenu options={[{label: "A", value: "a"},
            {label: "B", value: "b"}
        ]} dropdownClass="TestDropdown" visible={visible} setVisible={setVisible} closeOnFocusLost closeOnChoose select={handleSelect} />
    );
    var optionA = screen.getByText("A")

    expect(optionA).toBeInTheDocument()
    optionA.click()
    setTimeout(() => {
        expect(optionA).not.toBeInTheDocument()
    }, 100)
})

test("hides when clicked away", () => {
    var clicks = {}
    var visible = true
    var setVisible = (v) => {
        visible = v
    }
    const handleSelect = (option) => {
        if(!clicks[option]) {
            clicks[option] = 0
        }
        clicks[option]++
    }

    render(
        <>
            <h1>Hello</h1>
            <DropdownMenu options={[{label: "A", value: "a"},
                {label: "B", value: "b"}
            ]} dropdownClass="TestDropdown" visible={visible} setVisible={setVisible} closeOnFocusLost closeOnChoose select={handleSelect} />
        </>
    );

    var optionA = screen.getByText("A")
    var text = screen.getByText("Hello")

    optionA.click(text)

    setTimeout(() => {
        expect(optionA).not.toBeInTheDocument()
    }, 100)
})