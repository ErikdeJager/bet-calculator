import {Component, createMemo, createSignal} from "solid-js";


const CalculatorSplitWinrateNoDraw: Component = () => {

    const [betSize, setBetSize] = createSignal<number>(100)

    const [oneWinCount, setOneWinCount] = createSignal<number>(0)
    const [twoWinCount, setTwoWinCount] = createSignal<number>(0)


    const [oneMultiplier, setOneMultiplier] = createSignal<number>(0)
    const [twoMultiplier, setTwoMultiplier] = createSignal<number>(0)

    const oneOutcome = createMemo(() => betSize() * oneMultiplier());
    const twoOutcome = createMemo(() => betSize() * twoMultiplier());

    const oneFrequency = createMemo(() => {
        const total = oneWinCount() + twoWinCount();
        return total > 0 ? oneWinCount() / total : 0;
    });

    const twoFrequency = createMemo(() => {
        const total = oneWinCount() + twoWinCount();
        return total > 0 ? twoWinCount() / total : 0;
    });

    const oneEV = createMemo(() => {
        const valuationOne = oneOutcome() * oneFrequency()
        const valuationTwo = (betSize() - betSize() * 2) * twoFrequency()
        return valuationOne + valuationTwo

    })
    const twoEV = createMemo(() => {
        const valuationOne = (betSize() - betSize() * 2) * oneFrequency()
        const valuationTwo = twoOutcome() * twoFrequency()
        return valuationOne + valuationTwo
    })

    return (
        <>
            <p>Enter bet size</p>
            <input type="number" placeholder="Bet size" class="input" value={betSize()} onInput={(e) => {
                setBetSize(parseInt(e.target.value));
            }} />

            <div class={"grid grid-cols-2 gap-14 mt-10"}>
                <div class={"flex flex-col gap-4"}>
                    <h2 class={"text-xl"}>First Option</h2>

                    <div>
                        <p>Total wins</p>
                        <input type="number" class="input w-full" value={oneWinCount()} onInput={(e) => {
                            setOneWinCount(parseInt(e.target.value));
                        }} />
                    </div>

                    <div>
                        <p>Enter win multiplier (Format: 1,25)</p>
                        <input type="number" step="any" placeholder="Format: 1,25" class="input w-full" value={oneMultiplier()} onInput={(e) => {
                            setOneMultiplier(parseFloat(e.target.value));
                        }} />
                    </div>

                    <div>
                        <p>Potential profit</p>
                        <input disabled type="number" step="any"  class="input w-full" value={oneOutcome()}/>
                    </div>

                    <div>
                        <p>Odds of winning</p>
                        <input disabled type="text" step="any" placeholder="Format: 1,25" class="input w-full" value={oneFrequency() * 100 + "%"}/>
                    </div>

                </div>
                <div class={"flex flex-col gap-4"}>
                    <h2 class={"text-xl"}>Second Option</h2>

                    <div>
                        <p>Total wins</p>
                        <input type="number" class="input w-full" value={twoWinCount()} onInput={(e) => {
                            setTwoWinCount(parseInt(e.target.value));
                        }} />
                    </div>

                    <div>
                        <p>Enter win multiplier (Format: 1,25)</p>
                        <input type="number" step="any" placeholder="Format: 1,25" class="input w-full" value={twoMultiplier()} onInput={(e) => {
                            setTwoMultiplier(parseFloat(e.target.value));
                        }} />
                    </div>

                    <div>
                        <p>Potential profit</p>
                        <input disabled type="number" step="any"  class="input w-full" value={twoOutcome()}/>
                    </div>

                    <div>
                        <p>Odds of winning</p>
                        <input disabled type="text" step="any" placeholder="Format: 1,25" class="input w-full" value={twoFrequency() * 100 + "%"}/>
                    </div>
                </div>
            </div>

            <div class="divider">EV</div>

            <div class={"grid grid-cols-2 gap-14 mt-10"}>
                <input disabled type="text" class="input w-full" value={oneEV()}/>
                <input disabled type="text" class="input w-full" value={twoEV()}/>
            </div>
        </>
    )
}

export default CalculatorSplitWinrateNoDraw;