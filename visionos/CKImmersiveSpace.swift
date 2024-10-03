import SwiftUI
import RealityKit
import CKSpace

struct CKImmersiveSpace: View {
  @State var character: Entity = Entity()
  @State private var scene = Entity()
  
  var body: some View {
    RealityView { content in
      let rootEntity = Entity()
      rootEntity.addSkybox(for: "ck-x-visionpro-bg")
      content.add(rootEntity)
      scene = await setupScene()
      character = await setupCharacter()
      
      content.add(scene)
      content.add(character)
      setupSceneEntityAnimations()
    }
    .enableMovingEntity(character)
  }
  
  @MainActor
  func setupCharacter() async -> Entity {
    guard let character = try? await Entity(named: "Character", in: cKSpaceBundle) else { return Entity() }
    guard let resource = try? await EnvironmentResource(named: "ImageBasedLighting") else { return Entity() }
    let iblComponent = ImageBasedLightComponent(source: .single(resource), intensityExponent: 0.25)
    character.components.set(iblComponent)
    character.components.set(ImageBasedLightReceiverComponent(imageBasedLight: character))
    character.position = SIMD3(x: 0, y: 0, z: -1)
    character.scale *= 0.6
    character.components.set(InputTargetComponent())
    character.generateCollisionShapes(recursive: true)
    character.components.set(HoverEffectComponent())
    return character
  }
  
  @MainActor
  func setupScene() async -> Entity {
    guard let immersiveContentEntity = try? await Entity(named: "Scene", in: cKSpaceBundle) else { return Entity() }
    
    // Offset the scene so it doesn't appear underneath the user or conflict with the main window.
    immersiveContentEntity.position = SIMD3<Float>(0, 0, -2)
    guard let resource = try? await EnvironmentResource(named: "ImageBasedLighting") else { return Entity() }
    let iblComponent = ImageBasedLightComponent(source: .single(resource), intensityExponent: 0.25)
    immersiveContentEntity.components.set(iblComponent)
    immersiveContentEntity.components.set(ImageBasedLightReceiverComponent(imageBasedLight: immersiveContentEntity))
    
    return immersiveContentEntity
  }
  
  @MainActor
  func setupSceneEntityAnimations() {
    endlessRotate(entityName: "Rocks1", axis: [0,0,1])
    endlessRotate(entityName: "Rocks2", axis: [0,0,1])
    endlessRotate(entityName: "Planet1", axis: [1,0,0])
    endlessRotate(entityName: "Planet2", axis: [1,0,0])
    endlessRotate(entityName: "Planet3", axis: [1,0,0])
    endlessScale(entityName: "CKLogo")
    
    // Atom built-in animation
    guard let atom = scene.findEntity(named: "Atom1") else { return }
    atom.availableAnimations.forEach { animation in
      atom.playAnimation(animation.repeat(duration: .infinity), transitionDuration: 1.25, startsPaused: false)
    }
  }
  
  func endlessRotate(entityName: String, axis: SIMD3<Float>) {
    guard let entity = scene.findEntity(named: entityName) else { return }
    var transform = entity.transform
    transform.rotation *= simd_quatf(angle: .pi, axis: axis)
    
    let animationDefinition = FromToByAnimation(to: transform, duration: 30, bindTarget: .transform, repeatMode: .autoReverse)

    let animationResource = try! AnimationResource.generate(with: animationDefinition)
    entity.playAnimation(animationResource)
  }
  
  func endlessScale(entityName: String) {
    guard let entity = scene.findEntity(named: entityName) else { return }
    var transform = entity.transform
    transform.scale *= 1.3
    
    let animationDefinition = FromToByAnimation(to: transform, duration: 30, bindTarget: .transform, repeatMode: .autoReverse)

    let animationResource = try! AnimationResource.generate(with: animationDefinition)
    entity.playAnimation(animationResource)
  }
  
  func endlessMove(entityName: String) {
    guard let entity = scene.findEntity(named: entityName) else { return }
    var transform = entity.transform
    transform.translation += 0.1
    
    let animationDefinition = FromToByAnimation(to: transform, duration: 5, bindTarget: .transform, repeatMode: .autoReverse)

    let animationResource = try! AnimationResource.generate(with: animationDefinition)
    entity.playAnimation(animationResource)
  }
}

