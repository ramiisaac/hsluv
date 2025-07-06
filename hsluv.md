# Hsluv Pack Documentation

This Coda Pack provides a collection of formulas for working with colors, including color conversion, color analysis, color harmony, color scheme generation, and color manipulation. Here's a detailed description of each formula with examples.

## Color Conversion

### HexToRGB
Convert a hex color to RGB values.

**Example:**
`=HexToRGB("#FF0000")` returns `{r: 255, g: 0, b: 0}`

### RGBToHex
Convert RGB values to a hex color.

**Example:**
`=RGBToHex(255, 0, 0)` returns `"#FF0000"`

### HexToHSLUV
Convert a hex color to HSLUV values.

**Example:**
`=HexToHSLUV("#FF0000")` returns `{h: 0, s: 100, l: 50}`

### HSLUVToHex
Convert HSLUV values to a hex color.

**Example:**
`=HSLUVToHex(0, 100, 50)` returns `"#FF0000"`

### HexToHPLUV
Convert a hex color to HPLuv values.

**Example:**
`=HexToHPLUV("#FF0000")` returns `{h: 0, p: 100, l: 53.23}`

### HPLUVToHex
Convert HPLuv values to a hex color.

**Example:**
`=HPLUVToHex(0, 100, 53.23)` returns `"#FF0000"`

### RGBToCMYK
Convert RGB values to CMYK values.

**Example:**
`=RGBToCMYK(255, 0, 0)` returns `{c: 0, m: 1, y: 1, k: 0}`

### CMYKToRGB
Convert CMYK values to RGB values.

**Example:**
`=CMYKToRGB(0, 1, 1, 0)` returns `{r: 255, g: 0, b: 0}`

## Color Analysis

### ContrastRatio
Calculate the contrast ratio between two colors.

**Example:**
`=ContrastRatio("#000000", "#FFFFFF")` returns `21`

### IsAccessible
Check if a text color is accessible on a given background color according to WCAG guidelines.

**Example:**
`=IsAccessible("#000000", "#FFFFFF", "AA", "large")` returns `true`

### SuggestTextColor
Suggest an accessible text color for a given background color based on WCAG guidelines.

**Example:**
`=SuggestTextColor("#FF0000", "AA")` returns `"#FFFFFF"`

### ColorName
Get the name of a color.

**Example:**
`=ColorName("#FF0000")` returns `"Red"`

### IsWarmOrCool
Determine if a color is warm or cool.

**Example:**
`=IsWarmOrCool("#FF0000")` returns `"Warm"`

## Color Harmony

### EvaluateColorHarmony
Evaluate the harmony of a color combination.

**Example:**
`=EvaluateColorHarmony("#FF0000", "#00FF00")` returns `"Complementary (high contrast)"`

## Color Scheme Generation

### MonochromaticScheme
Generate a monochromatic color scheme.

**Example:**
`=MonochromaticScheme("#FF0000", 5)` returns `["#FF0000", "#E60000", "#CC0000", "#B30000", "#990000"]`

### AnalogousScheme
Generate an analogous color scheme.

**Example:**
`=AnalogousScheme("#FF0000", 5, 30)` returns `["#FF0000", "#FF3300", "#FF6600", "#FF9900", "#FFCC00"]`

### TriadicScheme
Generate a triadic color scheme.

**Example:**
`=TriadicScheme("#FF0000")` returns `["#FF0000", "#00FF00", "#0000FF"]`

### TetradicScheme
Generate a tetradic (rectangle) color scheme.

**Example:**
`=TetradicScheme("#FF0000")` returns `["#FF0000", "#00FF00", "#0000FF", "#FF00FF"]`

## Color Manipulation

### AdjustBrightness
Adjust the brightness of a color.

**Example:**
`=AdjustBrightness("#FF0000", 20)` returns `"#FF3333"`

### AdjustSaturation
Adjust the saturation of a color.

**Example:**
`=AdjustSaturation("#FF0000", -50)` returns `"#800000"`

### MixColors
Mix two colors with a given ratio.

**Example:**
`=MixColors("#FF0000", "#00FF00", 0.5)` returns `"#808000"`

### Tint
Create a tint of a color (mix with white).

**Example:**
`=Tint("#FF0000", 0.5)` returns `"#FF8080"`

### Shade
Create a shade of a color (mix with black).

**Example:**
`=Shade("#FF0000", 0.5)` returns `"#800000"`

### SimulateColorBlindness
Simulate how a color appears to people with color blindness.

**Example:**
`=SimulateColorBlindness("#FF0000", "protanopia")` returns `"#7F7F3F"`

## Gradients

### LinearGradient
Generate a linear gradient between two colors.

**Example:**
`=LinearGradient("#FF0000", "#00FF00", 5)` returns `["#FF0000", "#BF4000", "#7F8000", "#3FBF00", "#00FF00"]`