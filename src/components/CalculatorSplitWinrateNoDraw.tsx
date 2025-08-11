import {Component, createMemo, createSignal} from "solid-js";


const CalculatorSplitWinrateNoDraw: Component = () => {

    const [betSize, setBetSize] = createSignal<number>(100)

    const [oneWinCount, setOneWinCount] = createSignal<number>(0)
    const [twoWinCount, setTwoWinCount] = createSignal<number>(0)
    const [oneLossCount, setOneLossCount] = createSignal<number>(0)
    const [twoLossCount, setTwoLossCount] = createSignal<number>(0)


    const [oneMultiplier, setOneMultiplier] = createSignal<number>(0)
    const [twoMultiplier, setTwoMultiplier] = createSignal<number>(0)

    const oneOutcome = createMemo(() => betSize() * (oneMultiplier() - 1));
    const twoOutcome = createMemo(() => betSize() * (twoMultiplier() - 1));

    const winFrequency = createMemo(() => {
        const totalOne = oneWinCount() + oneLossCount();
        const totalTwo = twoWinCount() + twoLossCount();

        const winrateOne = totalOne > 0 ? oneWinCount() / totalOne : 0;
        const winrateTwo = totalTwo > 0 ? twoWinCount() / totalTwo : 0;

        const oneFrequency = winrateOne / (winrateOne + winrateTwo)
        const twoFrequency = winrateTwo / (winrateOne + winrateTwo)

        return [oneFrequency, twoFrequency]
    });

    const oneEV = createMemo(() => {
        const valuationOne = oneOutcome() * winFrequency()[0]
        const valuationTwo = (betSize() - betSize() * 2) * winFrequency()[1]
        return valuationOne + valuationTwo

    })
    const twoEV = createMemo(() => {
        const valuationOne = (betSize() - betSize() * 2) * winFrequency()[0]
        const valuationTwo = twoOutcome() * winFrequency()[1]
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
                    <input type="text" placeholder={"Option 1"} class="input w-full text-xl"/>

                    <div>
                        <p>Winrate (Win/Loss)</p>
                        <div class={"flex flex-row gap-2"}>
                            <input type="number" class="input w-full" value={oneWinCount()} onInput={(e) => {
                                setOneWinCount(parseInt(e.target.value));
                            }} />
                            <input type="number" class="input w-full" value={oneLossCount()} onInput={(e) => {
                                setOneLossCount(parseInt(e.target.value));
                            }} />
                        </div>
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
                        <input disabled type="text" step="any" placeholder="Format: 1,25" class="input w-full" value={winFrequency()[0] * 100 + "%"}/>
                    </div>

                </div>
                <div class={"flex flex-col gap-4"}>
                    <input type="text" placeholder={"Option 2"} class="input w-full text-xl"/>

                    <div>
                        <p>Winrate (Win/Loss)</p>
                        <div class={"flex flex-row gap-2"}>
                            <input type="number" class="input w-full" value={twoWinCount()} onInput={(e) => {
                                setTwoWinCount(parseInt(e.target.value));
                            }} />
                            <input type="number" class="input w-full" value={twoLossCount()} onInput={(e) => {
                                setTwoLossCount(parseInt(e.target.value));
                            }} />
                        </div>
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
                        <input disabled type="text" step="any" placeholder="Format: 1,25" class="input w-full" value={winFrequency()[1] * 100 + "%"}/>
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