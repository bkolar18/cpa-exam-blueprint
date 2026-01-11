"use client";

import { useState, useCallback, useEffect, useRef } from"react";

interface CalculatorProps {
 isOpen: boolean;
 onClose: () => void;
}

type Operator ="+"|"-"|"*"|"/";

export default function Calculator({ isOpen, onClose }: CalculatorProps) {
 const [display, setDisplay] = useState("0");
 const [previousValue, setPreviousValue] = useState<number | null>(null);
 const [operator, setOperator] = useState<Operator | null>(null);
 const [waitingForOperand, setWaitingForOperand] = useState(false);
 const [memory, setMemory] = useState<number>(0);
 const [history, setHistory] = useState<string>("");
 const [position, setPosition] = useState({ x: 20, y: 20 });
 const [isDragging, setIsDragging] = useState(false);
 const dragOffset = useRef({ x: 0, y: 0 });
 const calculatorRef = useRef<HTMLDivElement>(null);

 // Handle keyboard input
 useEffect(() => {
 if (!isOpen) return;

 const handleKeyDown = (e: KeyboardEvent) => {
 // Prevent default for calculator keys
 if (
 /^[0-9.+\-*/=]$/.test(e.key) ||
 e.key ==="Enter"||
 e.key ==="Escape"||
 e.key ==="Backspace"||
 e.key ==="Delete"
 ) {
 e.preventDefault();
 }

 if (/^[0-9]$/.test(e.key)) {
 inputDigit(e.key);
 } else if (e.key ===".") {
 inputDecimal();
 } else if (e.key ==="+") {
 performOperation("+");
 } else if (e.key ==="-") {
 performOperation("-");
 } else if (e.key ==="*") {
 performOperation("*");
 } else if (e.key ==="/") {
 performOperation("/");
 } else if (e.key ==="="|| e.key ==="Enter") {
 calculate();
 } else if (e.key ==="Escape") {
 clearAll();
 } else if (e.key ==="Backspace") {
 backspace();
 } else if (e.key ==="Delete") {
 clearEntry();
 }
 };

 window.addEventListener("keydown", handleKeyDown);
 return () => window.removeEventListener("keydown", handleKeyDown);
 }, [isOpen, display, previousValue, operator, waitingForOperand]);

 // Handle dragging
 const handleMouseDown = useCallback((e: React.MouseEvent) => {
 if ((e.target as HTMLElement).closest("button")) return;
 setIsDragging(true);
 dragOffset.current = {
 x: e.clientX - position.x,
 y: e.clientY - position.y,
 };
 }, [position]);

 useEffect(() => {
 if (!isDragging) return;

 const handleMouseMove = (e: MouseEvent) => {
 setPosition({
 x: e.clientX - dragOffset.current.x,
 y: e.clientY - dragOffset.current.y,
 });
 };

 const handleMouseUp = () => {
 setIsDragging(false);
 };

 window.addEventListener("mousemove", handleMouseMove);
 window.addEventListener("mouseup", handleMouseUp);

 return () => {
 window.removeEventListener("mousemove", handleMouseMove);
 window.removeEventListener("mouseup", handleMouseUp);
 };
 }, [isDragging]);

 const inputDigit = useCallback((digit: string) => {
 if (waitingForOperand) {
 setDisplay(digit);
 setWaitingForOperand(false);
 } else {
 setDisplay(display ==="0"? digit : display + digit);
 }
 }, [display, waitingForOperand]);

 const inputDecimal = useCallback(() => {
 if (waitingForOperand) {
 setDisplay("0.");
 setWaitingForOperand(false);
 } else if (!display.includes(".")) {
 setDisplay(display +".");
 }
 }, [display, waitingForOperand]);

 const clearAll = useCallback(() => {
 setDisplay("0");
 setPreviousValue(null);
 setOperator(null);
 setWaitingForOperand(false);
 setHistory("");
 }, []);

 const clearEntry = useCallback(() => {
 setDisplay("0");
 }, []);

 const backspace = useCallback(() => {
 if (display.length > 1) {
 setDisplay(display.slice(0, -1));
 } else {
 setDisplay("0");
 }
 }, [display]);

 const toggleSign = useCallback(() => {
 const value = parseFloat(display);
 setDisplay(String(-value));
 }, [display]);

 const inputPercent = useCallback(() => {
 const value = parseFloat(display);
 setDisplay(String(value / 100));
 }, [display]);

 const performOperation = useCallback((nextOperator: Operator) => {
 const inputValue = parseFloat(display);

 if (previousValue === null) {
 setPreviousValue(inputValue);
 setHistory(`${inputValue} ${nextOperator}`);
 } else if (operator) {
 const result = calculateResult(previousValue, inputValue, operator);
 setDisplay(String(result));
 setPreviousValue(result);
 setHistory(`${result} ${nextOperator}`);
 }

 setOperator(nextOperator);
 setWaitingForOperand(true);
 }, [display, previousValue, operator]);

 const calculateResult = (left: number, right: number, op: Operator): number => {
 switch (op) {
 case"+":
 return left + right;
 case"-":
 return left - right;
 case"*":
 return left * right;
 case"/":
 return right !== 0 ? left / right : NaN;
 default:
 return right;
 }
 };

 const calculate = useCallback(() => {
 if (operator === null || previousValue === null) return;

 const inputValue = parseFloat(display);
 const result = calculateResult(previousValue, inputValue, operator);

 setHistory(`${previousValue} ${operator} ${inputValue} =`);
 setDisplay(String(result));
 setPreviousValue(null);
 setOperator(null);
 setWaitingForOperand(true);
 }, [display, previousValue, operator]);

 // Memory functions
 const memoryClear = useCallback(() => setMemory(0), []);
 const memoryRecall = useCallback(() => {
 setDisplay(String(memory));
 setWaitingForOperand(true);
 }, [memory]);
 const memoryAdd = useCallback(() => {
 setMemory(memory + parseFloat(display));
 }, [memory, display]);
 const memorySubtract = useCallback(() => {
 setMemory(memory - parseFloat(display));
 }, [memory, display]);

 // Square root
 const sqrt = useCallback(() => {
 const value = parseFloat(display);
 setDisplay(String(Math.sqrt(value)));
 setWaitingForOperand(true);
 }, [display]);

 if (!isOpen) return null;

 const Button = ({
 onClick,
 children,
 className ="",
 title,
 }: {
 onClick: () => void;
 children: React.ReactNode;
 className?: string;
 title?: string;
 }) => (
 <button
 onClick={onClick}
 title={title}
 className={`p-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
 >
 {children}
 </button>
 );

 return (
 <div
 ref={calculatorRef}
 className="fixed z-50 bg-white dark:bg-[var(--card)] rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
 style={{
 left: position.x,
 top: position.y,
 width: 280,
 cursor: isDragging ?"grabbing":"default",
 }}
 >
 {/* Header - Draggable */}
 <div
 className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-[var(--background)] cursor-grab active:cursor-grabbing"
 onMouseDown={handleMouseDown}
 >
 <span className="text-sm font-medium text-gray-700 dark:text-[var(--muted-light)]">
 Calculator
 </span>
 <button
 onClick={onClose}
 className="p-1 text-gray-500 hover:text-gray-700 dark:text-[var(--muted)] dark:hover:text-gray-200"
 >
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
 </svg>
 </button>
 </div>

 {/* Display */}
 <div className="p-3 bg-gray-50 dark:bg-[var(--background)]">
 {history && (
 <div className="text-xs text-gray-500 dark:text-[var(--muted)] text-right mb-1 truncate">
 {history}
 </div>
 )}
 <div className="text-right text-2xl font-mono text-gray-900 dark:text-[var(--foreground)] truncate">
 {display}
 </div>
 {memory !== 0 && (
 <div className="text-xs text-blue-500 dark:text-blue-400 text-right mt-1">
 M: {memory}
 </div>
 )}
 </div>

 {/* Buttons */}
 <div className="p-2 grid grid-cols-4 gap-1">
 {/* Row 1 - Memory */}
 <Button
 onClick={memoryClear}
 title="Memory Clear"
 className="text-sm bg-gray-100 dark:bg-[var(--card-hover)] text-gray-700 dark:text-[var(--muted-light)] hover:bg-gray-200 dark:hover:bg-gray-600"
 >
 MC
 </Button>
 <Button
 onClick={memoryRecall}
 title="Memory Recall"
 className="text-sm bg-gray-100 dark:bg-[var(--card-hover)] text-gray-700 dark:text-[var(--muted-light)] hover:bg-gray-200 dark:hover:bg-gray-600"
 >
 MR
 </Button>
 <Button
 onClick={memoryAdd}
 title="Memory Add"
 className="text-sm bg-gray-100 dark:bg-[var(--card-hover)] text-gray-700 dark:text-[var(--muted-light)] hover:bg-gray-200 dark:hover:bg-gray-600"
 >
 M+
 </Button>
 <Button
 onClick={memorySubtract}
 title="Memory Subtract"
 className="text-sm bg-gray-100 dark:bg-[var(--card-hover)] text-gray-700 dark:text-[var(--muted-light)] hover:bg-gray-200 dark:hover:bg-gray-600"
 >
 M-
 </Button>

 {/* Row 2 - Clear and operations */}
 <Button
 onClick={clearAll}
 className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50"
 >
 AC
 </Button>
 <Button
 onClick={clearEntry}
 className="bg-gray-100 dark:bg-[var(--card-hover)] text-gray-700 dark:text-[var(--muted-light)] hover:bg-gray-200 dark:hover:bg-gray-600"
 >
 CE
 </Button>
 <Button
 onClick={backspace}
 className="bg-gray-100 dark:bg-[var(--card-hover)] text-gray-700 dark:text-[var(--muted-light)] hover:bg-gray-200 dark:hover:bg-gray-600"
 >
 <svg className="w-5 h-5 mx-auto"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"/>
 </svg>
 </Button>
 <Button
 onClick={() => performOperation("/")}
 className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50"
 >
 ÷
 </Button>

 {/* Row 3 */}
 <Button
 onClick={() => inputDigit("7")}
 className="bg-white dark:bg-[var(--card)] text-gray-900 dark:text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-700"
 >
 7
 </Button>
 <Button
 onClick={() => inputDigit("8")}
 className="bg-white dark:bg-[var(--card)] text-gray-900 dark:text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-700"
 >
 8
 </Button>
 <Button
 onClick={() => inputDigit("9")}
 className="bg-white dark:bg-[var(--card)] text-gray-900 dark:text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-700"
 >
 9
 </Button>
 <Button
 onClick={() => performOperation("*")}
 className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50"
 >
 ×
 </Button>

 {/* Row 4 */}
 <Button
 onClick={() => inputDigit("4")}
 className="bg-white dark:bg-[var(--card)] text-gray-900 dark:text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-700"
 >
 4
 </Button>
 <Button
 onClick={() => inputDigit("5")}
 className="bg-white dark:bg-[var(--card)] text-gray-900 dark:text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-700"
 >
 5
 </Button>
 <Button
 onClick={() => inputDigit("6")}
 className="bg-white dark:bg-[var(--card)] text-gray-900 dark:text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-700"
 >
 6
 </Button>
 <Button
 onClick={() => performOperation("-")}
 className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50"
 >
 −
 </Button>

 {/* Row 5 */}
 <Button
 onClick={() => inputDigit("1")}
 className="bg-white dark:bg-[var(--card)] text-gray-900 dark:text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-700"
 >
 1
 </Button>
 <Button
 onClick={() => inputDigit("2")}
 className="bg-white dark:bg-[var(--card)] text-gray-900 dark:text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-700"
 >
 2
 </Button>
 <Button
 onClick={() => inputDigit("3")}
 className="bg-white dark:bg-[var(--card)] text-gray-900 dark:text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-700"
 >
 3
 </Button>
 <Button
 onClick={() => performOperation("+")}
 className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50"
 >
 +
 </Button>

 {/* Row 6 */}
 <Button
 onClick={toggleSign}
 className="bg-white dark:bg-[var(--card)] text-gray-900 dark:text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-700"
 >
 ±
 </Button>
 <Button
 onClick={() => inputDigit("0")}
 className="bg-white dark:bg-[var(--card)] text-gray-900 dark:text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-700"
 >
 0
 </Button>
 <Button
 onClick={inputDecimal}
 className="bg-white dark:bg-[var(--card)] text-gray-900 dark:text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-700"
 >
 .
 </Button>
 <Button
 onClick={calculate}
 className="bg-blue-500 text-white hover:bg-blue-600"
 >
 =
 </Button>

 {/* Row 7 - Extra functions */}
 <Button
 onClick={inputPercent}
 className="bg-gray-100 dark:bg-[var(--card-hover)] text-gray-700 dark:text-[var(--muted-light)] hover:bg-gray-200 dark:hover:bg-gray-600"
 >
 %
 </Button>
 <Button
 onClick={sqrt}
 className="bg-gray-100 dark:bg-[var(--card-hover)] text-gray-700 dark:text-[var(--muted-light)] hover:bg-gray-200 dark:hover:bg-gray-600"
 >
 √
 </Button>
 <div className="col-span-2"/>
 </div>

 {/* Keyboard hint */}
 <div className="px-3 pb-2 text-xs text-gray-400 dark:text-[var(--muted)] text-center">
 Use keyboard for quick input
 </div>
 </div>
 );
}
