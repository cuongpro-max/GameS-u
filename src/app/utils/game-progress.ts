// Educational content for each level
export interface LevelLesson {
    title: string;
    content: string;
    keyPoints: string[];
}

export const LEVEL_LESSONS: Record<number, LevelLesson> = {
    1: {
        title: "Khái Niệm Dân Tộc",
        content: "Dân tộc được hiểu theo hai nghĩa: Nghĩa rộng (Nation) chỉ quốc gia-dân tộc độc lập có lãnh thổ và nền kinh tế thống nhất. Nghĩa hẹp (Ethnie) chỉ cộng đồng tộc người được hình thành trong lịch sử, chung ngôn ngữ, văn hóa, lịch sử và có ý thức tự giác tộc người. Đây là các tộc người thành phần trong quốc gia đa tộc người.",
        keyPoints: [
            "Dân tộc nghĩa rộng là quốc gia-dân tộc độc lập",
            "Dân tộc nghĩa hẹp là cộng đồng tộc người thành phần",
            "Khác biệt với sắc tộc, chủng tộc, bộ lạc, bộ tộc",
            "Có tính ổn định và gắn kết lịch sử lâu đời"
        ]
    },
    2: {
        title: "Hai Xu Hướng Dân Tộc",
        content: "Trong sự phát triển dân tộc có hai xu hướng khách quan: Xu hướng tách ra tự quyết (các cộng đồng dân cư muốn tự hình thành dân tộc độc lập) và xu hướng liên hiệp (các dân tộc muốn liên kết, xích lại gần nhau để phát triển kinh tế, văn hóa và chống áp bức).",
        keyPoints: [
            "Xu hướng tách ra thể hiện quyền tự quyết độc lập",
            "Xu hướng liên hiệp thể hiện sự xích lại gần nhau",
            "Cả hai xu hướng đều mang tính khách quan lịch sử",
            "Cần xóa bỏ áp bức giai cấp để liên hiệp tự do"
        ]
    },
    3: {
        title: "Nguyên Nhân Tồn Tại Tôn Giáo",
        content: "Tôn giáo vẫn tồn tại trong thời kỳ quá độ lên chủ nghĩa xã hội do nhận thức của con người chưa đồng đều và chưa theo kịp thực tế; tâm lý sợ hãi trước thiên tai hoặc mong cầu siêu nhiên; giá trị đạo đức văn hóa phù hợp vẫn được duy trì; và các thế lực thù địch vẫn lợi dụng tôn giáo chống phá.",
        keyPoints: [
            "Nhận thức và trình độ dân trí chưa đồng đều",
            "Tâm lý mong cầu che chở trước khó khăn tự nhiên/xã hội",
            "Giá trị đạo đức, văn hóa tôn giáo được kế thừa",
            "Bị các thế lực thù địch lợi dụng chính trị"
        ]
    },
    4: {
        title: "Hai Mặt Chính Trị Và Tư Tưởng",
        content: "Trong giải quyết vấn đề tôn giáo, cần phân biệt rõ hai mặt: Mặt tư tưởng (phản ánh nhận thức khác biệt của quần chúng, giải quyết bằng giáo dục thuyết phục) và Mặt chính trị (sự lợi dụng tôn giáo của các thế lực phản động chống phá cách mạng, phải giải quyết bằng pháp luật biện pháp hành chính).",
        keyPoints: [
            "Mặt tư tưởng: Khác biệt nhận thức, tôn trọng niềm tin",
            "Mặt chính trị: Lợi dụng chống phá, đối kháng giai cấp",
            "Tránh đánh đồng đức tin lành mạnh với cực đoan chính trị",
            "Kiên quyết đấu tranh chống thế lực phản động lợi dụng tôn giáo"
        ]
    },
    5: {
        title: "Cương Lĩnh Dân Tộc",
        content: "Cương lĩnh dân tộc của chủ nghĩa Mác - Lênin gồm ba nội dung: Các dân tộc hoàn toàn bình đẳng; Các dân tộc được quyền tự quyết; Liên hiệp công nhân tất cả các dân tộc. Đây là cơ sở lý luận khoa học cho việc giải quyết các quan hệ dân tộc trên thế giới.",
        keyPoints: [
            "Bình đẳng dân tộc là quyền thiêng liêng và tối cao",
            "Quyền tự quyết bao gồm quyền tách ra hoặc liên hiệp tự nguyện",
            "Liên hiệp công nhân là hạt nhân đoàn kết giai cấp và dân tộc",
            "Kiên quyết bài trừ phong trào tự quyết giả hiệu"
        ]
    },
    6: {
        title: "Bản Chất Của Tôn Giáo",
        content: "Tôn giáo là một hình thái ý thức xã hội phản ánh hư ảo hiện thực khách quan vào đầu óc con người. Tôn giáo mang thế giới quan duy tâm, đối lập với thế giới quan duy vật biện chứng khoa học. Con người sáng tạo ra tôn giáo vì nhu cầu tâm linh nhưng đồng thời cũng bị tôn giáo chi phối.",
        keyPoints: [
            "Tôn giáo phản ánh hư ảo hiện thực khách quan",
            "Mang thế giới quan duy tâm lý giải thế giới",
            "Sản phẩm sáng tạo của con người trong lịch sử",
            "Sự xoa dịu tâm lý trước những bất lực thực tế"
        ]
    },
    7: {
        title: "Đặc Điểm Của Tôn Giáo",
        content: "Tôn giáo có ba đặc điểm cơ bản: Tính lịch sử (sinh ra, biến đổi và mất đi theo sự phát triển xã hội); Tính quần chúng (là nhu cầu tinh thần của đông đảo nhân dân lao động); Tính chính trị (có thể bị lợi dụng để phục vụ lợi ích giai cấp thống trị hoặc phản kháng áp bức).",
        keyPoints: [
            "Tính lịch sử: Tồn tại hữu hạn theo sự phát triển xã hội",
            "Tính quần chúng: Là sinh hoạt tinh thần của số đông nhân dân",
            "Tính chính trị: Phản ánh mâu thuẫn giai cấp hoặc bị lợi dụng",
            "Đức tin tôn giáo lành mạnh cần được tôn trọng"
        ]
    },
    8: {
        title: "Chính Sách Tôn Giáo Việt Nam",
        content: "Chính sách của Đảng và Nhà nước Việt Nam: Tôn trọng và bảo đảm quyền tự tự do tín ngưỡng và không tín ngưỡng; đoàn kết đồng bào có đạo và không có đạo; nghiêm cấm các hành vi lợi dụng tôn giáo để chia rẽ khối đại đoàn kết dân tộc hoặc vi phạm pháp luật.",
        keyPoints: [
            "Bảo đảm tự do tín ngưỡng hoặc không tín ngưỡng cho nhân dân",
            "Đoàn kết tôn giáo là cốt lõi xây dựng đất nước",
            "Hoạt động tôn giáo phải tuân thủ pháp luật Nhà nước",
            "Nghiêm cấm lợi dụng tôn giáo để chống phá cách mạng"
        ]
    }
};

// Progress tracking interfaces
export interface LevelStats {
    bestTime: number;  // in seconds (elapsed + penalty)
    completedCount: number;
    lastPlayed?: string;  // ISO date string
}

export interface GameProgress {
    unlockedLevels: number[];
    levelStats: Record<number, LevelStats>;
}

export interface LevelResult {
    level: number;
    sentence: string;
    elapsedTime: number;
    penaltyTime: number;
    totalTime: number;
}

// LocalStorage key
export const STORAGE_KEY = 'philosophical-snake-progress';

// LocalStorage utilities
export function loadProgress(): GameProgress {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Failed to load progress:', error);
    }

    // Default: only level 1 unlocked
    return {
        unlockedLevels: [1],
        levelStats: {}
    };
}

export function saveProgress(progress: GameProgress): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
        console.error('Failed to save progress:', error);
    }
}

export function unlockNextLevel(currentProgress: GameProgress, completedLevel: number): GameProgress {
    const nextLevel = completedLevel + 1;
    // Updated to support up to 8 levels
    if (nextLevel <= 8 && !currentProgress.unlockedLevels.includes(nextLevel)) {
        return {
            ...currentProgress,
            unlockedLevels: [...currentProgress.unlockedLevels, nextLevel].sort((a, b) => a - b)
        };
    }
    return currentProgress;
}

export function updateLevelStats(
    currentProgress: GameProgress,
    level: number,
    totalTime: number
): GameProgress {
    const currentStats = currentProgress.levelStats[level];
    const isNewRecord = !currentStats || totalTime < currentStats.bestTime;

    return {
        ...currentProgress,
        levelStats: {
            ...currentProgress.levelStats,
            [level]: {
                bestTime: isNewRecord ? totalTime : (currentStats?.bestTime || totalTime),
                completedCount: (currentStats?.completedCount || 0) + 1,
                lastPlayed: new Date().toISOString()
            }
        }
    };
}

export function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
}
