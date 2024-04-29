import SwiftUI
import React
import React_RCTSwiftExtensions


@main
struct ConfDemoApp: App {
  @UIApplicationDelegateAdaptor var delegate: AppDelegate
  @State private var immersionLevel: ImmersionStyle = .mixed
  
  @Environment (\.reactContext) private var reactContext
  
  var body: some Scene {
    RCTMainWindow(moduleName: "ConfDemo")
    RCTWindow(id: "SecondWindow", sceneData: reactContext.getSceneData(id: "SecondWindow"))
      .defaultSize(width: 400, height: 600)
    
    ImmersiveSpace(id: "Callstack") {
      CKImmersiveSpace()
    }
    .immersionStyle(selection: $immersionLevel, in: .mixed, .progressive, .full)
  }
}
