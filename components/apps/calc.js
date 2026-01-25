import React, { Component } from 'react';

export class Calc extends Component {
    constructor() {
        super();
        this.state = {
            display: '0',
            previousValue: null,
            operator: null,
            waitingForOperand: false,
            history: ''
        };
    }

    inputDigit = (digit) => {
        const { display, waitingForOperand } = this.state;

        if (waitingForOperand) {
            this.setState({
                display: String(digit),
                waitingForOperand: false
            });
        } else {
            this.setState({
                display: display === '0' ? String(digit) : display + digit
            });
        }
    }

    inputDecimal = () => {
        const { display, waitingForOperand } = this.state;

        if (waitingForOperand) {
            this.setState({
                display: '0.',
                waitingForOperand: false
            });
            return;
        }

        if (!display.includes('.')) {
            this.setState({
                display: display + '.'
            });
        }
    }

    clearAll = () => {
        this.setState({
            display: '0',
            previousValue: null,
            operator: null,
            waitingForOperand: false,
            history: ''
        });
    }

    clearEntry = () => {
        this.setState({
            display: '0',
            waitingForOperand: false
        });
    }

    backspace = () => {
        const { display } = this.state;
        if (display.length === 1 || (display.length === 2 && display.startsWith('-'))) {
            this.setState({ display: '0' });
        } else {
            this.setState({ display: display.slice(0, -1) });
        }
    }

    toggleSign = () => {
        const { display } = this.state;
        this.setState({
            display: display.startsWith('-') ? display.slice(1) : '-' + display
        });
    }

    inputPercent = () => {
        const { display } = this.state;
        const value = parseFloat(display);
        this.setState({
            display: String(value / 100)
        });
    }

    performOperation = (nextOperator) => {
        const { display, previousValue, operator } = this.state;
        const inputValue = parseFloat(display);

        if (previousValue === null) {
            this.setState({
                previousValue: inputValue,
                waitingForOperand: true,
                operator: nextOperator,
                history: `${display} ${this.getOperatorSymbol(nextOperator)}`
            });
        } else if (operator) {
            const result = this.calculate(previousValue, inputValue, operator);
            const resultStr = this.formatResult(result);
            
            this.setState({
                display: resultStr,
                previousValue: result,
                waitingForOperand: true,
                operator: nextOperator,
                history: nextOperator === '=' ? '' : `${resultStr} ${this.getOperatorSymbol(nextOperator)}`
            });
        }
    }

    calculate = (prev, next, operator) => {
        switch (operator) {
            case '+':
                return prev + next;
            case '-':
                return prev - next;
            case '*':
                return prev * next;
            case '/':
                return next !== 0 ? prev / next : 'Error';
            default:
                return next;
        }
    }

    formatResult = (result) => {
        if (result === 'Error') return 'Error';
        if (typeof result !== 'number') return String(result);
        
        // Handle very large or very small numbers
        if (Math.abs(result) > 1e12 || (Math.abs(result) < 1e-10 && result !== 0)) {
            return result.toExponential(6);
        }
        
        // Round to avoid floating point issues
        const rounded = Math.round(result * 1e10) / 1e10;
        return String(rounded);
    }

    getOperatorSymbol = (operator) => {
        switch (operator) {
            case '+': return '+';
            case '-': return '−';
            case '*': return '×';
            case '/': return '÷';
            default: return '';
        }
    }

    handleKeyDown = (e) => {
        const key = e.key;
        
        if (key >= '0' && key <= '9') {
            this.inputDigit(parseInt(key, 10));
        } else if (key === '.') {
            this.inputDecimal();
        } else if (key === '+') {
            this.performOperation('+');
        } else if (key === '-') {
            this.performOperation('-');
        } else if (key === '*') {
            this.performOperation('*');
        } else if (key === '/') {
            e.preventDefault();
            this.performOperation('/');
        } else if (key === 'Enter' || key === '=') {
            this.performOperation('=');
        } else if (key === 'Escape') {
            this.clearAll();
        } else if (key === 'Backspace') {
            this.backspace();
        } else if (key === '%') {
            this.inputPercent();
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    render() {
        const { display, history } = this.state;

        const Button = ({ onClick, className, children, span2 }) => (
            <button
                onClick={onClick}
                className={`
                    ${span2 ? 'col-span-2' : ''}
                    h-14 rounded-lg font-medium text-lg
                    transition-all duration-150 ease-out
                    active:scale-95 focus:outline-none focus:ring-2 focus:ring-ub-orange/50
                    ${className}
                `}
            >
                {children}
            </button>
        );

        return (
            <div className="h-full w-full bg-[#1e1e1e] flex flex-col select-none">
                {/* Display */}
                <div className="flex-shrink-0 p-4 bg-[#2d2d2d] border-b border-black/30">
                    {/* History */}
                    <div className="h-6 text-right text-gray-400 text-sm mb-1 overflow-hidden">
                        {history}
                    </div>
                    {/* Main Display */}
                    <div className="text-right text-white text-4xl font-light overflow-hidden text-ellipsis">
                        {display}
                    </div>
                </div>

                {/* Button Grid */}
                <div className="flex-grow p-3 grid grid-cols-4 gap-2">
                    {/* Row 1 */}
                    <Button 
                        onClick={this.clearAll}
                        className="bg-[#3d3d3d] hover:bg-[#4a4a4a] text-[#ff6b6b]"
                    >
                        AC
                    </Button>
                    <Button 
                        onClick={this.toggleSign}
                        className="bg-[#3d3d3d] hover:bg-[#4a4a4a] text-white"
                    >
                        +/−
                    </Button>
                    <Button 
                        onClick={this.inputPercent}
                        className="bg-[#3d3d3d] hover:bg-[#4a4a4a] text-white"
                    >
                        %
                    </Button>
                    <Button 
                        onClick={() => this.performOperation('/')}
                        className="bg-ub-orange hover:bg-orange-600 text-white"
                    >
                        ÷
                    </Button>

                    {/* Row 2 */}
                    <Button 
                        onClick={() => this.inputDigit(7)}
                        className="bg-[#4a4a4a] hover:bg-[#5a5a5a] text-white"
                    >
                        7
                    </Button>
                    <Button 
                        onClick={() => this.inputDigit(8)}
                        className="bg-[#4a4a4a] hover:bg-[#5a5a5a] text-white"
                    >
                        8
                    </Button>
                    <Button 
                        onClick={() => this.inputDigit(9)}
                        className="bg-[#4a4a4a] hover:bg-[#5a5a5a] text-white"
                    >
                        9
                    </Button>
                    <Button 
                        onClick={() => this.performOperation('*')}
                        className="bg-ub-orange hover:bg-orange-600 text-white"
                    >
                        ×
                    </Button>

                    {/* Row 3 */}
                    <Button 
                        onClick={() => this.inputDigit(4)}
                        className="bg-[#4a4a4a] hover:bg-[#5a5a5a] text-white"
                    >
                        4
                    </Button>
                    <Button 
                        onClick={() => this.inputDigit(5)}
                        className="bg-[#4a4a4a] hover:bg-[#5a5a5a] text-white"
                    >
                        5
                    </Button>
                    <Button 
                        onClick={() => this.inputDigit(6)}
                        className="bg-[#4a4a4a] hover:bg-[#5a5a5a] text-white"
                    >
                        6
                    </Button>
                    <Button 
                        onClick={() => this.performOperation('-')}
                        className="bg-ub-orange hover:bg-orange-600 text-white"
                    >
                        −
                    </Button>

                    {/* Row 4 */}
                    <Button 
                        onClick={() => this.inputDigit(1)}
                        className="bg-[#4a4a4a] hover:bg-[#5a5a5a] text-white"
                    >
                        1
                    </Button>
                    <Button 
                        onClick={() => this.inputDigit(2)}
                        className="bg-[#4a4a4a] hover:bg-[#5a5a5a] text-white"
                    >
                        2
                    </Button>
                    <Button 
                        onClick={() => this.inputDigit(3)}
                        className="bg-[#4a4a4a] hover:bg-[#5a5a5a] text-white"
                    >
                        3
                    </Button>
                    <Button 
                        onClick={() => this.performOperation('+')}
                        className="bg-ub-orange hover:bg-orange-600 text-white"
                    >
                        +
                    </Button>

                    {/* Row 5 */}
                    <Button 
                        onClick={() => this.inputDigit(0)}
                        span2
                        className="bg-[#4a4a4a] hover:bg-[#5a5a5a] text-white"
                    >
                        0
                    </Button>
                    <Button 
                        onClick={this.inputDecimal}
                        className="bg-[#4a4a4a] hover:bg-[#5a5a5a] text-white"
                    >
                        .
                    </Button>
                    <Button 
                        onClick={() => this.performOperation('=')}
                        className="bg-ub-orange hover:bg-orange-600 text-white"
                    >
                        =
                    </Button>
                </div>
            </div>
        );
    }
}

export default Calc;

export const displayTerminalCalc = () => {
    return <Calc />;
};
