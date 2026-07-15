"""
CNN architecture.

This is the exact architecture used to train cnn.pth in the original
Streamlit application. It must not be modified, or the saved weights
will fail to load (state_dict shape mismatch).
"""

from torch import nn
from torch.nn import functional as F


class CNN(nn.Module):
    """4-class brain MRI classifier (Glioma / Meningioma / No Tumor / Pituitary)."""

    def __init__(self, num_classes: int = 4):
        super().__init__()

        self.conv1 = nn.Conv2d(3, 16, kernel_size=(3, 3), padding=1)
        self.pool1 = nn.MaxPool2d(kernel_size=(2, 2), stride=2)

        self.conv2 = nn.Conv2d(16, 32, kernel_size=(3, 3), padding=1)
        self.pool2 = nn.MaxPool2d(kernel_size=(2, 2), stride=2)

        self.flat_size = 32 * 8 * 8

        self.fc1 = nn.Linear(self.flat_size, 512)
        self.fc2 = nn.Linear(512, num_classes)

    def forward(self, x):
        x = self.pool1(F.relu(self.conv1(x)))
        x = self.pool2(F.relu(self.conv2(x)))
        x = x.flatten(1)
        x = F.relu(self.fc1(x))
        return self.fc2(x)
