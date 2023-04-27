import { render, screen, act } from '@testing-library/react';
import { DropdownMenu } from './Dropdown';

describe('Dropdown', () => {
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
        const handleSelect = jest.fn()
        var options = [
            {label: "A", value: "a"},
            {label: "B", value: "b"}
        ]
    
        render(<DropdownMenu options={options} dropdownClass="TestDropdown" visible select={handleSelect} />);
        var optionA = screen.getByText("A")
        var optionB = screen.getByText("B")
        
        act(() => {
            optionA.click()
        })
        expect(handleSelect).toHaveBeenCalledTimes(1)
        expect(handleSelect).toHaveBeenCalledWith("a")
    
        act(() => {
            optionB.click()
        })
        expect(handleSelect).toHaveBeenCalledWith("b")
    
        act(() => {
            optionB.click()
        })
        expect(handleSelect).toHaveBeenCalledWith("b")
    });
    
    test('hides when something was chosen', () => {
        const handleSelect = jest.fn();
        const setVisible = jest.fn();
      
        const { getByTestId } = render(
            <DropdownMenu
                options={[
                    { label: 'A', value: 'a' },
                    { label: 'B', value: 'b' },
                ]}
                dropdownClass="TestDropdown"
                visible={true}
                setVisible={setVisible}
                closeOnChoose={true}
                select={handleSelect}
            />
        );
      
        const optionA = screen.getByText('A');
        const dropdownElement = getByTestId('dropdown');
      
        expect(dropdownElement).toBeInTheDocument();
        expect(optionA).toBeInTheDocument();
    
        act(() => {
            optionA.click();
        })
      
        expect(setVisible).toHaveBeenCalledWith(false);
        expect(handleSelect).toHaveBeenCalledWith('a');
    });
    
    test("hides when clicked away", () => {
        const setVisible = jest.fn()
        const handleSelect = jest.fn()
    
        render(
            <DropdownMenu options={[{label: "A", value: "a"},
               {label: "B", value: "b"}
            ]} dropdownClass="TestDropdown" visible setVisible={setVisible} closeOnFocusLost select={handleSelect} />
        );
    
        document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
    
        expect(setVisible).toHaveBeenCalledTimes(1)
        expect(setVisible).toHaveBeenCalledWith(false)
        expect(handleSelect).toHaveBeenCalledTimes(0)
    })
})