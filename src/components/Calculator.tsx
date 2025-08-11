import {Component, createSignal, Show} from "solid-js";
import CalculatorWithDraw from "./CalculatorWithDraw";
import CalculatorNoDraw from "./CalculatorNoDraw";
import CalculatorSplitWinrateNoDraw from "./CalculatorSplitWinrateNoDraw";

const Calculator: Component = () => {

    const [activeTab, setActiveTab] = createSignal<string>("withDraw")

    return (
        <>
            <h1 class={"text-2xl"}>Bet Calculator</h1>
            <p class={"text-sm italic"}>By Erik de Jager</p>

            <div class={"w-fit mx-auto"}>
                <div role="tablist" class="tabs tabs-border">
                    <Show when={activeTab() === "withDraw"}>
                        <a role="tab" class="tab tab-active">Calculator With Draw</a>
                        <a role="tab" class="tab" onClick={() => setActiveTab("noDraw")}>Calculator No Draw</a>
                        <a role="tab" class="tab" onClick={() => setActiveTab("splitWinrateNoDraw")}>Split Winrate No Draw</a>
                    </Show>
                    <Show when={activeTab() === "noDraw"}>
                        <a role="tab" class="tab" onClick={() => setActiveTab("withDraw")}>Calculator With Draw</a>
                        <a role="tab" class="tab tab-active">Calculator No Draw</a>
                        <a role="tab" class="tab" onClick={() => setActiveTab("splitWinrateNoDraw")}>Split Winrate No Draw</a>
                    </Show>
                    <Show when={activeTab() === "splitWinrateNoDraw"}>
                        <a role="tab" class="tab" onClick={() => setActiveTab("withDraw")}>Calculator With Draw</a>
                        <a role="tab" class="tab" onClick={() => setActiveTab("noDraw")}>Calculator No Draw</a>
                        <a role="tab" class="tab tab-active">Split Winrate No Draw</a>
                    </Show>
                </div>
            </div>

            <Show when={activeTab() === "withDraw"}>
                <CalculatorWithDraw/>
            </Show>
            <Show when={activeTab() === "noDraw"}>
                <CalculatorNoDraw/>
            </Show>
            <Show when={activeTab() === "splitWinrateNoDraw"}>
                <CalculatorSplitWinrateNoDraw/>
            </Show>

        </>
    )
}

export default Calculator;