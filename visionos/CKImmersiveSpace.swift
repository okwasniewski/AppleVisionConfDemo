import SwiftUI
import RealityKit
import CKSpace

struct CKImmersiveSpace: View {
  var body: some View {
    RealityView { content in
      if let immersiveContentEntity = try? await Entity(named: "Scene", in: cKSpaceBundle) {
        content.add(immersiveContentEntity)
        guard let resource = try? await EnvironmentResource(named: "ImageBasedLight") else { return }
        let iblComponent = ImageBasedLightComponent(source: .single(resource), intensityExponent: 0.25)
        immersiveContentEntity.components.set(iblComponent)
        immersiveContentEntity.components.set(ImageBasedLightReceiverComponent(imageBasedLight: immersiveContentEntity))
      }
      
      if let character = try? await Entity(named: "Character", in: cKSpaceBundle) {
        guard let resource = try? await EnvironmentResource(named: "ImageBasedLight") else { return }
        let iblComponent = ImageBasedLightComponent(source: .single(resource), intensityExponent: 0.25)
        character.components.set(iblComponent)
        character.components.set(ImageBasedLightReceiverComponent(imageBasedLight: character))
        character.position = SIMD3(x: 0, y: 0, z: -1)
        character.scale *= 0.6
        
        content.add(character)
      }
    }
  }
}
