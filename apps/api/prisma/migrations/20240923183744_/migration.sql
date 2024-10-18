-- AlterTable
ALTER TABLE "List" ADD COLUMN     "emoji" TEXT DEFAULT '';

-- CreateTable
CREATE TABLE "MessageImage" (
    "id" UUID NOT NULL,
    "messageId" UUID NOT NULL,

    CONSTRAINT "MessageImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MessageImage" ADD CONSTRAINT "MessageImage_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
