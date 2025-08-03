import { TestExecutor, Test, compare, TestDiagnosticRule } from "notus-qml-test";

@TestDiagnosticRule("invalid-function-definition-rule")
export class InvalidFunctionDefinitionRuleTest {

    @Test('Invalid Function Definition')
    testInvalidFunctionDefinition(executor: TestExecutor) {

        executor.addCase(
            {
                name: "Invalid function, statement block",
                code: `
                    Rectangle {
                        Component.onCompleted: {}
                    }
                `,
                report: function (data: any) {
                    compare(data.item, {
                        message: "Dont use statement block, use arrow function or function definition !",
                        severity: 2,
                        suggestions: [
                            {
                                title: "function() {}",
                                items: [
                                    {
                                        "newText": "function() {}"
                                    }
                                ]
                            },
                            {
                                title: "() => {}",
                                items: [
                                    {
                                        "newText": "() => {}"
                                    }
                                ]
                            }
                        ]
                    });
                }
            }
        )

        executor.addCase(
            {
                name: "With arrow function",
                code: `
                    Rectangle {
                        Component.onCompleted: () => {}
                    }
                `,
            }
        );


        executor.addCase(
            {
                name: "With function",
                code: `
                    Rectangle {
                        Component.onCompleted: function(){}
                    }
                `,
            }
        );

        executor.run();
    }

}