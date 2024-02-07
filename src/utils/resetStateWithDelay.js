export default function resetStateWithDelay(setterFunction) {
    setTimeout(() => {
        setterFunction(false);
    }, 3000);
}