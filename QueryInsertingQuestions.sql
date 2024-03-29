﻿﻿USE [QuizDB]
GO

DECLARE @CategoryID INT = (SELECT [CategoryID] FROM [dbo].[Categories] WHERE [CategoryName] = 'Computer Science')
SET IDENTITY_INSERT [dbo].[Questions] ON 


INSERT [dbo].[Questions] ([QuestionID], [QuestionName], [ImageName], [Option1], [Option2], [Option3], [Option4], [Answer], [CategoryID]) VALUES (1, N'What does HTML stand for?', NULL, N'Hyper Trainer Marking Language', N'Hyper Text Marketing Language', N'Hyper Text Markup Language', N'Hyper Text Markup Leveler', 2, @CategoryID)


INSERT [dbo].[Questions] ([QuestionID], [QuestionName], [ImageName], [Option1], [Option2], [Option3], [Option4], [Answer], [CategoryID]) VALUES (2, N'The brain of any computer system is', NULL, N'ALU', N'Memory', N'CPU', N'Control unit', 2, @CategoryID)


INSERT [dbo].[Questions] ([QuestionID], [QuestionName], [ImageName], [Option1], [Option2], [Option3], [Option4], [Answer], [CategoryID]) VALUES (3, N'Which of the following computer language is used for artificial intelligence?', NULL, N'FORTRAN', N'PROLOG', N'C', N'COBOL', 1, @CategoryID)


INSERT [dbo].[Questions] ([QuestionID], [QuestionName], [ImageName], [Option1], [Option2], [Option3], [Option4], [Answer], [CategoryID]) VALUES (4, N'What is the primary requisite of a good computer programmer?', NULL, N'Mathematical Mind', N'Artistic mind', N'Logical Mind', N'Scientific Knowledge', 2, @CategoryID)


INSERT [dbo].[Questions] ([QuestionID], [QuestionName], [ImageName], [Option1], [Option2], [Option3], [Option4], [Answer], [CategoryID]) VALUES (5, N'Name the device.', N'mouse.png', N'Keyboard', N'Monitor', N'Mouse', N'Graphics Card', 2, @CategoryID)


INSERT [dbo].[Questions] ([QuestionID], [QuestionName], [ImageName], [Option1], [Option2], [Option3], [Option4], [Answer], [CategoryID]) VALUES (6, N'The first mechanical computer designed by Charles Babbage was called?
', NULL, N'Analytical Engine', N'Calculator', N'Processor', N'Abacus', 0, @CategoryID)

INSERT [dbo].[Questions] ([QuestionID], [QuestionName], [ImageName], [Option1], [Option2], [Option3], [Option4], [Answer], [CategoryID]) VALUES (7, N'One byte is equivalent to ?', NULL, N'4 bits', N'8 bits', N'16 bits', N'32 bits', 1, @CategoryID)

INSERT [dbo].[Questions] ([QuestionID], [QuestionName], [ImageName], [Option1], [Option2], [Option3], [Option4], [Answer], [CategoryID]) VALUES (8, N'Web pages are written using ?', NULL, N'FTP', N'UML', N'HTML', N'URL', 2, @CategoryID)

INSERT [dbo].[Questions] ([QuestionID], [QuestionName], [ImageName], [Option1], [Option2], [Option3], [Option4], [Answer], [CategoryID]) VALUES (9, N'Which of the following is NOT operating system ?', NULL, N'Dos', N'Unix', N'Window NT', N'CSS', 3, @CategoryID)

INSERT [dbo].[Questions] ([QuestionID], [QuestionName], [ImageName], [Option1], [Option2], [Option3], [Option4], [Answer], [CategoryID]) VALUES (10, N'What is the full form of lP ?', NULL, N'Interface Program', N'Interface Protocol', N'Internet program', N'Internet Protocol', 3, @CategoryID)

SET IDENTITY_INSERT [dbo].[Questions] OFF
GO