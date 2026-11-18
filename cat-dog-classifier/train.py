import shutil
from pathlib import Path

from tensorflow import keras
from tensorflow.keras import layers

original_dir = Path("./DogCatRecognition/train")
base_dir = Path("./DogCatRecognition_small")
make_subsets = True

def make_subset(subset_name, start_index, end_index):
    for category in ("cat", "dog"):
        destination_dir = base_dir / subset_name / category
        destination_dir.mkdir(parents=True, exist_ok=True)

        for i in range(start_index, end_index):
            filename = f"{category}.{i}.jpg"
            source = original_dir / filename
            destination = destination_dir / filename

            # CHANGED: Skip files that are already copied, so rerunning is safe.
            if not destination.exists():
                shutil.copyfile(source, destination)

if make_subsets:
    make_subset("train", 0, 1000)
    make_subset("validation", 1000, 2000)
    make_subset("test", 2000, 2500)

#load the images from folders
train_dataset = keras.utils.image_dataset_from_directory(
    base_dir / "train",
    image_size=(180, 180),
    batch_size=32
)

validation_dataset = keras.utils.image_dataset_from_directory(
    base_dir / "validation",
    image_size=(180, 180),
    batch_size=32,
    shuffle=False
)

test_dataset = keras.utils.image_dataset_from_directory(
    base_dir / "test",
    image_size=(180, 180),
    batch_size=32,
    shuffle=False
)
#define random image changes to help the model generalize
data_augmentation = keras.Sequential(
    [
        layers.RandomFlip("horizontal"),
        layers.RandomRotation(0.1),
        layers.RandomZoom(0.2),
        layers.RandomContrast(0.2),
        layers.RandomTranslation(0.2, 0.2),
    ],
    name="data_augmentation"
)

inputs = keras.Input(shape=(180, 180, 3))

#apply the augmentation to the input images
x = data_augmentation(inputs)
x = layers.Rescaling(1.0 / 255)(x)

x = layers.Conv2D(32, kernel_size=3, activation="relu")(x)
x = layers.MaxPooling2D(pool_size=2)(x)

x = layers.Conv2D(64, kernel_size=3, activation="relu")(x)
x = layers.MaxPooling2D(pool_size=2)(x)

x = layers.Conv2D(128, kernel_size=3, activation="relu")(x)
x = layers.Conv2D(256, kernel_size=3, activation="relu")(x)
x = layers.MaxPooling2D(pool_size=2)(x)

x = layers.Conv2D(256, kernel_size=3, activation="relu")(x)
x = layers.Flatten()(x)

outputs = layers.Dense(1, activation="sigmoid")(x)
model = keras.Model(inputs=inputs, outputs=outputs)

model.compile(
    optimizer="rmsprop",
    loss="binary_crossentropy",
    metrics=["accuracy"]
)

checkpoint = keras.callbacks.ModelCheckpoint(
    filepath="cat_dog_small_1.keras",
    save_best_only=True,
    monitor="val_loss"
)

history = model.fit(
    train_dataset,
    validation_data=validation_dataset,
    epochs=25,
    callbacks=[checkpoint]
)

test_model = keras.models.load_model("cat_dog_small_1.keras")
test_loss, test_accuracy = test_model.evaluate(test_dataset)

print("Test loss:", test_loss)
print("Test accuracy:", test_accuracy)