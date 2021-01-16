var hx = require("hbuilderx");

class DemoTreeDataProvider extends hx.TreeDataProvider{
    constructor(demoData) {
        super();
        this._demoData = demoData;
    }
    getChildren(element) {
        let demoData = this._demoData;
        return new Promise(resolve => {
            if (!element) {
                resolve(demoData);
            } else {
                resolve(element.children);
            }
        });
    }
    getTreeItem(element) {
        return {
            label:element.name,
            collapsibleState:element.children ? 1 : 0,
			// 点击item的时候，执行的命令
            command:{
                command:element.children ? "":"extension.helloWorld",
                arguments:[
                    element.name
                ]
            }
        }
    }
}

//该方法将在插件激活的时候调用
function activate(context) {
	let demoData = [
		{
			name:"Root1",
			children:[
				{
					name:"child1"
				},
				{
					name:"child2"
				},
			],
		},
		{
			name:"Root2",
			children:[
				{
					name:"child3",
				},
				{
					name:"child4"
				},
			],
		}
	];
	
	// 注册一个 helloWorld 右键菜单
	let disposable = hx.commands.registerCommand('extension.helloWorld', (param) => {
		hx.window.showInformationMessage('选中了 TreeItem:' + param[0]);
	});
	hx.window.createTreeView("extensions.treedemo", {
		showCollapseAll: true,
		treeDataProvider: new DemoTreeDataProvider(demoData)
	});
	//订阅销毁钩子，插件禁用的时候，自动注销该command。
	context.subscriptions.push(disposable);
}
//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {

}
module.exports = {
	activate,
	deactivate
}
