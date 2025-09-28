# Apprentice-OS

## State Management:
Let's say im logged in and i reload the page, i don't wanna see the boot menu again, i should either be back in the system or on the lock screen
So add state management to make it easier for users to navigate

## Window Focus:
Focusing windows and layering with z-index. The focused window should allways be in front of other windows but there's still stuff that can be higher than the windows, like overlays, popups, taskbar
Idea:
- Make an array with all opened windows, the z-index is allways the order in the array reversed + 100. So if the Settings is at 0 and the last app is at 10, the settings would have a z-index of 110 and the last app would be at z-index 100

## Stuff I wanna add:
- Boot Screen (maybe BIOS too)
- Lock Screen with current time display with your current timezone, login forum and an option to create an account. Every account is saved in a database and stuff the user does gets stored for each user and displayed dinamicly
- Taskbar and AppMenu
- Window Manager
- Software Store
  - Text Editor
  - Some Games
  - Minecraft Skin viewer using [skinview3d](https://skinview3d-demo.vercel.app/)
  - Custom Cursors app to change your cursor
- File management system. Users can create/edit/delete files and folders.
- Settings to change appearence and to more stuff (Change Font, window border radius, change wallpaper, timezone)
- Task Manager with stats, running systems and stuff
- Add default apps like a Calculator and Music Player aswell as media player and more default apps