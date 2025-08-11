import {Component, createMemo, createSignal} from "solid-js";


const CalculatorCustomWithDraw: Component = () => {

    const [betSize, setBetSize] = createSignal<number>(100)

    const [oneFrequency, setOneFrequency] = createSignal<number>(0)
    const [drawFrequency, setDrawFrequency] = createSignal<number>(0)
    const [twoFrequency, setTwoFrequency] = createSignal<number>(0)

    const [oneMultiplier, setOneMultiplier] = createSignal<number>(0)
    const [drawMultiplier, setDrawMultiplier] = createSignal<number>(0)
    const [twoMultiplier, setTwoMultiplier] = createSignal<number>(0)

    const oneOutcome = createMemo(() => betSize() * (oneMultiplier() - 1));
    const drawOutcome = createMemo(() => betSize() * (drawMultiplier() - 1));
    const twoOutcome = createMemo(() => betSize() * (twoMultiplier() - 1));

    const oneEV = createMemo(() => {
        const valuationOne = oneOutcome() * oneFrequency()
        const valuationTwo = (betSize() - betSize() * 2) * (twoFrequency() + drawFrequency())
        return valuationOne + valuationTwo

    })

    const drawEV = createMemo(() => {
        const valuationOne = drawOutcome() * drawFrequency()
        const valuationTwo = (betSize() - betSize() * 2) * (oneFrequency() + twoFrequency())
        return valuationOne + valuationTwo
    }) // TODO

    const twoEV = createMemo(() => {
        const valuationOne = (betSize() - betSize() * 2) * (oneFrequency() + drawFrequency())
        const valuationTwo = twoOutcome() * twoFrequency()
        return valuationOne + valuationTwo
    })

    return (
        <>
            <p>Enter bet size</p>
            <input type="number" placeholder="Bet size" class="input" value={betSize()} onInput={(e) => {
                setBetSize(parseInt(e.target.value));
            }} />

            <div class={"grid grid-cols-3 gap-14 mt-10"}>
                <div class={"flex flex-col gap-4"}>
                    <input type="text" placeholder={"Option 1"} class="input w-full text-xl"/>

                    <div>
                        <p>Winrate (Format 50.00)</p>
                        <input type="number" class="input w-full" value={oneFrequency() * 100} onInput={(e) => {
                            setOneFrequency(parseInt(e.target.value) / 100);
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
                </div>

                <div class={"flex flex-col gap-4"}>
                    <input type="text" placeholder={"Draw"} class="input w-full text-xl"/>

                    <div>
                        <p>Draw rate (Format 50.00)</p>
                        <input type="number" class="input w-full" value={drawFrequency() * 100} onInput={(e) => {
                            setDrawFrequency(parseInt(e.target.value) / 100);
                        }} />
                    </div>

                    <div>
                        <p>Enter draw multiplier (Format: 1,25)</p>
                        <input type="number" step="any" placeholder="Format: 1,25" class="input w-full" value={drawMultiplier()} onInput={(e) => {
                            setDrawMultiplier(parseFloat(e.target.value));
                        }} />
                    </div>

                    <div>
                        <p>Potential profit</p>
                        <input disabled type="number" step="any"  class="input w-full" value={drawOutcome()}/>
                    </div>
                </div>

                <div class={"flex flex-col gap-4"}>
                    <input type="text" placeholder={"Option 2"} class="input w-full text-xl"/>

                    <div>
                        <p>Winrate (Format 50.00)</p>
                        <input type="number" class="input w-full" value={twoFrequency() * 100} onInput={(e) => {
                            setTwoFrequency(parseInt(e.target.value) / 100);
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
                </div>
            </div>

            <div class="divider">EV</div>

            <div class={"grid grid-cols-3 gap-14 mt-10"}>
                <input disabled type="text" class="input w-full" value={oneEV()}/>
                <input disabled type="text" class="input w-full" value={drawEV()}/>
                <input disabled type="text" class="input w-full" value={twoEV()}/>
            </div>
        </>
    )
}


export default CalculatorCustomWithDraw;