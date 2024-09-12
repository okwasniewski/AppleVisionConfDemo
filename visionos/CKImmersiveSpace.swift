import SwiftUI
import RealityKit
import CKSpace

struct CKImmersiveSpace: View {
  @State private var lab = Entity()
  
  var body: some View {
    RealityView { content in
      let rootEntity = Entity()
      rootEntity.addSkybox(for: "pure_sky")
      lab = await setupLab()
      
      rootEntity.addChild(lab)
      
      content.add(rootEntity)
    }
  }
  
  @MainActor
  func setupLab() async -> Entity {
    guard let lab = try? await Entity(named: "ModifiedLab") else {
      return Entity()
    }
    
    guard let resource = try? await EnvironmentResource(named: "ImageBasedLighting") else { return Entity() }
    var iblComponent = ImageBasedLightComponent(source: .single(resource), intensityExponent: 0.5)
    iblComponent.inheritsRotation = true
    lab.components.set(iblComponent)
    lab.components.set(ImageBasedLightReceiverComponent(imageBasedLight: lab))
    
    lab.position = SIMD3<Float>(x: -1, y: -1, z: 0)
    
    return lab
  }
  
}

#Preview {
  CKImmersiveSpace()
}
