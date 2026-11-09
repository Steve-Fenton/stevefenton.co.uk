---
title: Davinci Resolve and video notes
navOrder: 1000
pubDate: 2026-11-09
keywords: "davinci resolve,ffmpeg"
description: "Notes on Davinci Resolve and other video tools."
---

## Davinci

1. Fix each video first (zoom, position, etc)
2. Add intro/outro videos
3. Editing
4. Add appropriate fade-in/out (but otherwise hard cut throughout)
5. Insert pre-roll

### Exporting

Export settings

- Choose the rocket ship icon at the bottom
- QuickTime
- H.264
- 3840 x 2160 Ultra HD
- 29.97 frame rate
- Quality **Restrict to** `100000`

Audio export settings

- Choose the **Audio Only** preset
- Format: MP3
- Constant bit rate
- 320 Kb/s

I seem to get away with a minimal toolset! It will likely expand over time.

### Shortcut keys

`CMD` + `B` cuts all tracks in the timeline at the selected point

`D` toggles the selected track on or off


### Editing notes

It seems most natural to truncate dead air at the point you're cutting to different video track.

When sound bounces around (like everyone laughs at something) it feels natural to show that to the viewer so the sound has more context, like movement and facial expressions.

When you have a pre-roll clip idea, select the video and audio, copy, go back to the beginning and use **Paste Insert** from the **Edit** menu. Select all and add empty space before the pre-roll, then de-select the pre-roll and move everything else to add empty space after the pre-roll.

### Attributes

If you adjust the attributes on a clip, you can copy the clip, select the rest of the track, and choose **Paste Attributes** to apply the same settings to all selected clips.

### Subtitles

You can right-click on an audio channel in the timeline and select **Add subtitle track**. You can drag an SRT file onto the new track to populate it.

Selecting the captions lets you adjust the text in the Caption tab, or re-style in the Track tab. Style applies to the whole track, so you don't need to copy the attributes across.

When exporting, you need to switch on subtitle exports and use **Burn to Video** to make them always-visible, like for social videos.

## Video snips

- Grab with [yt-dlp](https://github.com/yt-dlp/yt-dlp?tab=readme-ov-file#usage-and-options)!
- Adjust with FFMPEG (`brew install ffmpeg`)

```bash
yt-dlp --output "~/Downloads/%(title)s.%(ext)s" <yt-url>
```

And any conversions can be done with FFMPEG

```bash
ffmpeg -i input.mkv -c:v copy -c:a aac output.mp4
```

### Reduce video file size

Reduce file size by running it through FFMPEG for a 1080p output.

```bash
ffmpeg -i input.mov -vf scale=-1:1080 output.mov
```
