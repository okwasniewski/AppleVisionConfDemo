import SwiftUI
import React
import React_RCTSwiftExtensions


@main
struct ConfDemoApp: App {
  @UIApplicationDelegateAdaptor var delegate: AppDelegate
  @State private var immersionLevel: ImmersionStyle = .mixed
  
  var body: some Scene {
    RCTMainWindow(moduleName: "ConfDemo")
    
    ImmersiveSpace(id: "Callstack") {
      CKImmersiveSpace()
    }
    .immersionStyle(selection: $immersionLevel, in: .mixed, .progressive, .full)
  }
}
