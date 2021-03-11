import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { ChallengesContext } from "./ChallengesContext";

let countdownTimeout: NodeJS.Timeout;

interface CountdownContextData {
    minutes: number;
    seconds: number;
    progress: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountDown: () => void;
    resetCountDown: () => void;
}

interface CountdownContextProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownContextProvider({
    children,
}: CountdownContextProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);

    const initialTime = 25 * 60;

    const [time, setTime] = useState(initialTime);
    const [progress, setProgress] = useState(0);
    const [isActive, setISActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountDown() {
        setISActive(true);
    }

    function resetCountDown() {
        clearTimeout(countdownTimeout);
        setISActive(false);
        setTime(initialTime);
        setProgress(0);
        setHasFinished(false);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
                setProgress(progress + (414 / initialTime) * 2);
            }, 1000);
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setISActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);

    return (
        <CountdownContext.Provider
            value={{
                minutes,
                seconds,
                progress,
                hasFinished,
                isActive,
                startCountDown,
                resetCountDown,
            }}
        >
            {children}
        </CountdownContext.Provider>
    );
}
