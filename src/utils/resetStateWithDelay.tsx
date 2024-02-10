export default function resetStateWithDelay(setterFunction: (value: boolean) => void): void {
    setTimeout(() => {
        setterFunction(false);
    }, 3000);
}
