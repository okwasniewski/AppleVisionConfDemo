import RealityKit
import SwiftUI
import Combine

extension Entity {
    func addSkybox(for destination: String) {
        let subscription = TextureResource.loadAsync(named: destination).sink(
            receiveCompletion: {
                switch $0 {
                case .finished: break
                case .failure(let error): assertionFailure("\(error)")
                }
            },
            receiveValue: { [weak self] texture in
                guard let self = self else { return }
                var material = UnlitMaterial()
                material.color = .init(texture: .init(texture))
                self.components.set(ModelComponent(
                    mesh: .generateSphere(radius: 1E3),
                    materials: [material]
                ))
                // We flip the sphere inside out so the texture is shown inside.
                self.scale *= .init(x: -1, y: 1, z: 1)
                self.transform.translation += SIMD3<Float>(0.0, 1.0, 0.0)
                
                // Rotate the sphere to show the best initial view of the space.
                updateRotation(for: destination)
            }
        )
        components.set(Entity.SubscriptionComponent(subscription: subscription))
    }
    
    func updateTexture(for destination: String) {
        let subscription = TextureResource.loadAsync(named: destination).sink(
            receiveCompletion: {
                switch $0 {
                case .finished: break
                case .failure(let error): assertionFailure("\(error)")
                }
            },
            receiveValue: { [weak self] texture in
                guard let self = self else { return }
                
                guard var modelComponent = self.components[ModelComponent.self] else {
                    fatalError("Should this be fatal? Probably.")
                }
                
                var material = UnlitMaterial()
                material.color = .init(texture: .init(texture))
                modelComponent.materials = [material]
                self.components.set(modelComponent)
                
                // Rotate the sphere to show the best initial view of the space.
                updateRotation(for: destination)
            }
        )
        components.set(Entity.SubscriptionComponent(subscription: subscription))
    }
    
    func updateRotation(for destination: String) {
        // Rotate the immersive space around the Y-axis set the user's
        // initial view of the immersive scene.
        let angle = Angle.degrees(90)
        let rotation = simd_quatf(angle: Float(angle.radians), axis: SIMD3<Float>(0, 1, 0))
        self.transform.rotation = rotation
    }
    
    /// A container for the subscription that comes from asynchronous texture loads.
    ///
    /// In order for async loading callbacks to work we need to store
    /// a subscription somewhere. Storing it on a component will keep
    /// the subscription alive for as long as the component is attached.
    struct SubscriptionComponent: Component {
        var subscription: AnyCancellable
    }
}
